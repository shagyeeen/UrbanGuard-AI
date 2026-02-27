import { create } from 'zustand';
import { Asset, AppState, AssetType, HealthStatus, Anomaly } from '../types';

const ASSET_TYPES: AssetType[] = ['Bridge', 'Water Pipe', 'Transformer', 'Traffic Signal', 'Building'];

const generateHistory = (count: number, min: number, max: number) => {
    const history = [];
    const now = new Date('2024-01-01T00:00:00Z'); // Deterministic date
    for (let i = count; i >= 0; i--) {
        history.push({
            timestamp: new Date(now.getTime() - i * 3600000).toISOString(),
            value: (min + max) / 2, // Deterministic value
        });
    }
    return history;
};

const CHENNAI_ASSETS_DATA = [
    { name: 'Kathipara Flyover', type: 'Bridge', location: 'Guindy' },
    { name: 'Napier Bridge', type: 'Bridge', location: 'Marina Beach' },
    { name: 'Adyar Bridge', type: 'Bridge', location: 'Adyar' },
    { name: 'Koyambedu Metro Hub', type: 'Building', location: 'Koyambedu' },
    { name: 'Thiruvanmiyur MRTS', type: 'Building', location: 'Thiruvanmiyur' },
    { name: 'Taramani Substation', type: 'Transformer', location: 'Taramani' },
    { name: 'Chembarambakkam Lake Intake', type: 'Water Pipe', location: 'Poonamallee' },
    { name: 'Kilpauk Pumping Station', type: 'Water Pipe', location: 'Kilpauk' },
    { name: 'Anna Salai Traffic Grid', type: 'Traffic Signal', location: 'Teynampet' },
    { name: 'Marina Beach Signal', type: 'Traffic Signal', location: 'Triplicane' },
    { name: 'Gem Flyover', type: 'Bridge', location: 'Nungambakkam' },
    { name: 'Velachery Flyover', type: 'Bridge', location: 'Velachery' },
    { name: 'Perambur Loco Works', type: 'Building', location: 'Perambur' },
    { name: 'Chennai Central Terminal', type: 'Building', location: 'Park Town' },
    { name: 'Egmore Station Terminal', type: 'Building', location: 'Egmore' },
    { name: 'Mylapore TNEB Grid', type: 'Transformer', location: 'Mylapore' },
    { name: 'Kodambakkam Main Pipeline', type: 'Water Pipe', location: 'Kodambakkam' },
    { name: 'Porur Flyover Bridge', type: 'Bridge', location: 'Porur' },
    { name: 'Chromepet Footbridge', type: 'Bridge', location: 'Chromepet' },
    { name: 'Tambaram Junction Signal', type: 'Traffic Signal', location: 'Tambaram' },
    { name: 'OMR Sholinganallur Grid', type: 'Traffic Signal', location: 'Sholinganallur' },
    { name: 'Nemmeli Desalination Plant', type: 'Building', location: 'Nemmeli' },
    { name: 'Minjur Desalination Plant', type: 'Building', location: 'Minjur' },
    { name: 'T. Nagar Power Grid', type: 'Transformer', location: 'T. Nagar' },
    { name: 'Mount Road Signal Grid', type: 'Traffic Signal', location: 'Little Mount' },
    { name: 'IT Expressway Flyover', type: 'Bridge', location: 'OMR' },
    { name: 'Ennore Power Plant', type: 'Building', location: 'Ennore' },
    { name: 'Royapuram Overbridge', type: 'Bridge', location: 'Royapuram' },
    { name: 'Saidapet Metro Station', type: 'Building', location: 'Saidapet' },
    { name: 'Ekkaduthangal Bridge', type: 'Bridge', location: 'Ekkaduthangal' },
    { name: 'Puzhal Reservoir Pipeline', type: 'Water Pipe', location: 'Puzhal' },
    { name: 'Avadi HVF Grid', type: 'Transformer', location: 'Avadi' },
    { name: 'Guindy Industrial Signal', type: 'Traffic Signal', location: 'Guindy' },
    { name: 'Ashok Nagar Main Intake', type: 'Water Pipe', location: 'Ashok Nagar' },
    { name: 'CMBT Koyambedu Terminal', type: 'Building', location: 'Koyambedu' },
    { name: 'Besant Nagar Pumping Station', type: 'Water Pipe', location: 'Besant Nagar' },
    { name: 'Anna Nagar Tower Water Line', type: 'Water Pipe', location: 'Anna Nagar' },
    { name: 'Red Hills Supply Line', type: 'Water Pipe', location: 'Red Hills' }
];

const COIMBATORE_ASSETS_DATA = [
    { name: 'Gandhipuram Flyover', type: 'Bridge', location: 'Gandhipuram' },
    { name: 'Avinashi Road Flyover', type: 'Bridge', location: 'Peelamedu' },
    { name: 'Ukkadam Flyover', type: 'Bridge', location: 'Ukkadam' },
    { name: 'Brookefields Power Node', type: 'Transformer', location: 'RS Puram' },
    { name: 'Siruvani Pipeline Alpha', type: 'Water Pipe', location: 'Alandurai' },
    { name: 'Pillur Water Intake', type: 'Water Pipe', location: 'Mettupalayam Rd' },
    { name: 'Coimbatore Junction Terminal', type: 'Building', location: 'City Center' },
    { name: 'TNAU Grid Substation', type: 'Transformer', location: 'TNAU Campus' },
    { name: 'Peelamedu Substation', type: 'Transformer', location: 'Peelamedu' },
    { name: 'L&T Bypass Signal', type: 'Traffic Signal', location: 'L&T Bypass' },
    { name: 'Saravanampatti IT Grid', type: 'Traffic Signal', location: 'Saravanampatti' },
    { name: 'Singanallur Lake Intake', type: 'Water Pipe', location: 'Singanallur' },
    { name: 'Ganapathy Main Supply', type: 'Water Pipe', location: 'Ganapathy' },
    { name: 'Ramanathapuram Signal', type: 'Traffic Signal', location: 'Ramanathapuram' },
    { name: 'Thudiyalur Power Node', type: 'Transformer', location: 'Thudiyalur' },
    { name: 'North Coimbatore Flyover', type: 'Bridge', location: 'North CBE' },
    { name: 'Podanur Junction', type: 'Building', location: 'Podanur' },
    { name: 'Sulur Airforce Grid', type: 'Transformer', location: 'Sulur' },
    { name: 'Vadavalli Water Line', type: 'Water Pipe', location: 'Vadavalli' },
    { name: 'Town Hall Market Signal', type: 'Traffic Signal', location: 'Town Hall' }
];

const generateInitialAssets = (data: any[], city: 'Chennai' | 'Coimbatore') => {
    return data.map((item, i) => {
        const type = item.type as AssetType;
        const min = type === 'Bridge' ? 20 : type === 'Transformer' ? 40 : 10;
        const max = type === 'Bridge' ? 80 : type === 'Transformer' ? 120 : 100;

        let healthScore = 98;
        let status: HealthStatus = 'Healthy';

        if (i % 7 === 0) {
            healthScore = 42;
            status = 'Critical';
        } else if (i % 5 === 0) {
            healthScore = 74;
            status = 'Warning';
        }

        const anomalies: Anomaly[] = [];
        if (status === 'Critical') {
            if (item.name === 'Gandhipuram Flyover') {
                anomalies.push(
                    {
                        id: `INIT-ANOM-${city.toLowerCase()}-${i}-1`,
                        timestamp: new Date('2026-02-28T02:34:13Z').toISOString(),
                        sensorId: `sensor-${city.toLowerCase()}-${i}-1`,
                        severity: 'Critical' as HealthStatus,
                        description: `Severe deviation detected: 101.5 μm/m`
                    },
                    {
                        id: `INIT-ANOM-${city.toLowerCase()}-${i}-2`,
                        timestamp: new Date('2026-02-28T02:34:10Z').toISOString(),
                        sensorId: `sensor-${city.toLowerCase()}-${i}-1`,
                        severity: 'Critical' as HealthStatus,
                        description: `Severe deviation detected: 100.2 μm/m`
                    }
                );
            } else {
                anomalies.push({
                    id: `INIT-ANOM-${city.toLowerCase()}-${i}`,
                    timestamp: new Date('2024-01-01T00:00:00Z').toISOString(),
                    sensorId: `sensor-${city.toLowerCase()}-${i}-1`,
                    severity: 'Critical' as HealthStatus,
                    description: `Structural stress detected at ${city} Metropolitan node.`
                });
            }
        }

        const center = city === 'Chennai' ? { lat: 13.0827, lng: 80.2707 } : { lat: 11.0168, lng: 76.9558 };

        // Pseudo-random but deterministic scatter
        // Uses prime numbers and modulo to create a non-circular pattern
        const latOffset = ((i * 17) % 100) / 1000 - 0.05;
        const lngOffset = ((i * 23) % 100) / 1000 - 0.05;

        const coordinates = {
            lat: center.lat + latOffset * (city === 'Chennai' ? 1.5 : 1.2),
            lng: center.lng + lngOffset * (city === 'Chennai' ? 1.8 : 1.4)
        };

        return {
            id: `ASSET-${city === 'Chennai' ? 'CH' : 'CBE'}-${2000 + i}`,
            name: item.name,
            location: item.location,
            city,
            coordinates,
            type,
            healthScore,
            status,
            lastMaintenance: '2024-01-15',
            trend: 'stable' as const,
            sensors: [
                {
                    id: `sensor-${city.toLowerCase()}-${i}-1`,
                    name: type === 'Transformer' ? 'Temp' : type === 'Water Pipe' ? 'PSI' : 'Strain',
                    value: status === 'Critical' ? max * 1.3 : status === 'Warning' ? max * 1.1 : (min + max) / 2,
                    unit: type === 'Transformer' ? '°C' : type === 'Water Pipe' ? 'PSI' : 'μm/m',
                    history: generateHistory(20, min, max),
                    threshold: { min, max, warningDev: 0.1, criticalDev: 0.25 }
                }
            ],
            anomalies,
        };
    });
};

const INITIAL_ASSETS: Asset[] = [
    ...generateInitialAssets(CHENNAI_ASSETS_DATA, 'Chennai'),
    ...generateInitialAssets(COIMBATORE_ASSETS_DATA, 'Coimbatore')
];

export const useAssetStore = create<AppState>((set, get) => ({
    assets: INITIAL_ASSETS,
    selectedCity: 'Chennai',
    overallHealth: 94,
    notifications: [],
    isLoading: false,

    setSelectedCity: (city) => set({ selectedCity: city }),

    getAssetById: (id: string) => get().assets.find(a => a.id === id),

    updateSensors: () => {
        set((state) => {
            const updatedAssets = state.assets.map((asset) => {
                let healthScore = 100;
                const newAnomalies: Anomaly[] = [...asset.anomalies];

                const updatedSensors = asset.sensors.map((sensor) => {
                    // Simulate fluctuation
                    const fluctuation = (Math.random() - 0.5) * 10;
                    let newValue = sensor.value + fluctuation;

                    // Rare random spike (Anomaly simulation)
                    if (Math.random() > 0.98) {
                        newValue += (Math.random() > 0.5 ? 1 : -1) * (sensor.threshold.max * 0.4);
                    }

                    // Bound check
                    newValue = Math.max(0, newValue);

                    // Threshold Logic
                    const devHigh = (newValue - sensor.threshold.max) / sensor.threshold.max;
                    const devLow = (sensor.threshold.min - newValue) / sensor.threshold.min;
                    const maxDev = Math.max(devHigh, devLow);

                    if (maxDev > sensor.threshold.criticalDev) {
                        healthScore -= 30;
                        if (Math.random() > 0.8) {
                            const newAnomaly: Anomaly = {
                                id: `ANOM-${Date.now()}-${Math.random()}`,
                                timestamp: new Date().toISOString(),
                                sensorId: sensor.id,
                                severity: 'Critical' as HealthStatus,
                                description: `Severe deviation detected: ${newValue.toFixed(1)} ${sensor.unit}`
                            };
                            newAnomalies.unshift(newAnomaly);
                        }
                    } else if (maxDev > sensor.threshold.warningDev) {
                        healthScore -= 10;
                    }

                    const newHistory = [...sensor.history.slice(1), { timestamp: new Date().toISOString(), value: newValue }];

                    return { ...sensor, value: newValue, history: newHistory };
                });

                // Add stability trend logic
                const lastVal = updatedSensors[0].value;
                const prevVal = asset.sensors[0].value;
                const trend = (lastVal > prevVal * 1.05 ? 'up' : lastVal < prevVal * 0.95 ? 'down' : 'stable') as 'up' | 'down' | 'stable';

                healthScore = Math.max(0, Math.min(100, healthScore));
                const status: HealthStatus = healthScore > 85 ? 'Healthy' : healthScore > 60 ? 'Warning' : 'Critical';

                return {
                    ...asset,
                    sensors: updatedSensors,
                    healthScore,
                    status,
                    trend,
                    anomalies: newAnomalies.slice(0, 10), // Keep last 10
                };
            });

            const avgHealth = updatedAssets.reduce((acc, a) => acc + a.healthScore, 0) / updatedAssets.length;

            const allNewAnomalies = updatedAssets.flatMap(a => a.anomalies);
            const criticalAnomalies = allNewAnomalies.filter(an => an.severity === 'Critical');

            return {
                assets: updatedAssets,
                overallHealth: Math.round(avgHealth),
                notifications: criticalAnomalies.slice(0, 5),
            };
        });
    },
}));
