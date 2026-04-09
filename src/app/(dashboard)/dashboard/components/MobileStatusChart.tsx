"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface MobileStatusChartProps {
    metrics: {
        grossSales: number;
        reconciled: number;
        pending: number;
    };
}

interface PieChartData {
    name: string;
    value: number;
    color: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: PieChartData }[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{data.name}</p>
                    <p className="text-sm font-extrabold text-slate-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.value)}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export function MobileStatusChart({ metrics }: MobileStatusChartProps) {
    const divergente = Math.max(0, metrics.grossSales - metrics.reconciled - metrics.pending);

    const data = [
        { name: "Conciliado", value: metrics.reconciled, color: "#10b981" }, 
        { name: "Pendente", value: metrics.pending, color: "#f59e0b" }, 
        { name: "Divergente", value: divergente, color: "#ef4444" }, 
    ].filter(item => item.value > 0); // Só mostra se tiver valor

    if (metrics.grossSales === 0) return null;

    const percentageReconciled = ((metrics.reconciled / metrics.grossSales) * 100).toFixed(0);

    return (
        <div className="w-full mt-6 bg-white p-5 rounded-3xl shadow-sm border border-slate-100/80 ring-1 ring-slate-900/5">
            <div className="mb-2">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Status do Capital</h2>
                <p className="text-sm text-slate-500 font-medium">Distribuição do volume bruto hoje.</p>
            </div>

            <div className="relative h-[250px] w-full flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-slate-900">{percentageReconciled}%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Seguro</span>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70} 
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold text-slate-600">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}