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

interface TooltipPayload {
    value: number;
    name: string;
    dataKey: string;
    color?: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
                <p className="text-sm font-bold text-slate-800 mb-3">{label}</p>
                <div className="space-y-2">
                    {payload.map((entry: TooltipPayload, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                                <div 
                                    className="w-2.5 h-2.5 rounded-full" 
                                    style={{ backgroundColor: entry.dataKey === 'revenue' ? '#10b981' : '#f43f5e' }}
                                />
                                <span className="text-sm text-slate-500 font-medium">{entry.name}</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900">
                                {new Intl.NumberFormat('pt-BR', { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }).format(entry.value)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    if (value === 0) return `0`;
    return `${value}`;
};

export function PerformanceChart({ data }: PerformanceChartProps) {
    return (
        <div className="w-full mt-8 bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100/80 ring-1 ring-slate-900/5">
            
            <div className="mb-4 sm:mb-6">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Receitas vs Despesas
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
                    Acompanhamento de fluxo de caixa mensal.
                </p>
            </div>
            
            <div className="relative w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                
                <div className="h-[280px] sm:h-[400px] min-w-[500px] sm:min-w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 10, right: 10, left: -25, bottom: 0 }} 
                            barGap={4}
                        >
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#059669" stopOpacity={0.8} />
                                </linearGradient>
                                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fb7185" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                vertical={false} 
                                stroke="#f1f5f9" 
                            />
                            
                            <XAxis
                                dataKey="month"
                                stroke="#94a3b8"
                                fontSize={11} 
                                fontWeight={600}
                                tickLine={false}
                                axisLine={false}
                                tickMargin={12}
                            />
                            
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={11}
                                fontWeight={600}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={formatYAxis}
                                width={45} 
                                tickMargin={4}
                            />
                            
                            <Tooltip 
                                content={<CustomTooltip />} 
                                cursor={{ fill: '#f8fafc' }} 
                            />
                            
                            <Legend 
                                wrapperStyle={{ paddingTop: '10px' }}
                                iconType="circle" 
                                iconSize={8}
                            />
                            
                            <Bar 
                                dataKey="revenue" 
                                name="Receitas" 
                                fill="url(#colorRevenue)" 
                                radius={[4, 4, 0, 0]} 
                                maxBarSize={40} 
                            />
                            
                            <Bar 
                                dataKey="expenses" 
                                name="Despesas" 
                                fill="url(#colorExpenses)" 
                                radius={[4, 4, 0, 0]} 
                                maxBarSize={40} 
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}