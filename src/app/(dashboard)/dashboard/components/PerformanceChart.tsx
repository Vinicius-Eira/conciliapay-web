"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

interface PerformanceData {
    month: string;
    revenue: number;
    expenses: number;
}

interface PerformanceChartProps {
    data: PerformanceData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
    return (
        <div className="h-[400px] w-full mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-6 text-gray-800">
                Receitas vs Despesas
            </h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis
                        dataKey="month"
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `R$ ${value}`}
                    />
                    <Tooltip
                        formatter={(value) => {
                            if (typeof value === "number") {
                                return [`R$ ${value.toFixed(2)}`, ""];
                            }
                            return ["R$ 0,00", ""];
                        }}
                        cursor={{ fill: '#f3f4f6' }}
                        contentStyle={{
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="revenue" name="Receitas" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="expenses" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}