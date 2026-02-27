'use client'

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { SensorData } from '@/types';

import { useState, useEffect } from 'react';

interface Props {
    sensor: SensorData;
}

export const SensorChart = ({ sensor }: Props) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sensor.history}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis
                        dataKey="timestamp"
                        hide
                    />
                    <YAxis
                        stroke="#ffffff40"
                        fontSize={10}
                        tickFormatter={(value) => `${value}${sensor.unit}`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#05070a',
                            borderColor: '#ffffff10',
                            borderRadius: '12px',
                            fontSize: '12px',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#06b6d4' }}
                        labelFormatter={(label) => `Time: ${isMounted ? new Date(label).toLocaleTimeString() : '---'}`}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationDuration={1000}
                        isAnimationActive={false} // Disable Recharts default to avoid flickering on rapid updates
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
