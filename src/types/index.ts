export type AssetType = 'Bridge' | 'Water Pipe' | 'Transformer' | 'Traffic Signal' | 'Building';
export type HealthStatus = 'Healthy' | 'Warning' | 'Critical';

export interface SensorData {
    id: string;
    name: string;
    value: number;
    unit: string;
    history: { timestamp: string; value: number }[];
    threshold: {
        min: number;
        max: number;
        warningDev: number; // percentage deviation
        criticalDev: number; // percentage deviation
    };
}

export interface Anomaly {
    id: string;
    timestamp: string;
    sensorId: string;
    severity: HealthStatus;
    description: string;
}

export type City = 'Chennai' | 'Coimbatore';

export interface Asset {
    id: string;
    name: string;
    location: string;
    city: City;
    coordinates: { lat: number; lng: number };
    type: AssetType;
    sensors: SensorData[];
    healthScore: number;
    status: HealthStatus;
    lastMaintenance: string;
    trend: 'up' | 'down' | 'stable';
    anomalies: Anomaly[];
}

export interface AppState {
    assets: Asset[];
    selectedCity: City;
    overallHealth: number;
    notifications: Anomaly[];
    isLoading: boolean;
    updateSensors: () => void;
    getAssetById: (id: string) => Asset | undefined;
    setSelectedCity: (city: City) => void;
}
