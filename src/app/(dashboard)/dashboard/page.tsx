"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api"; 
import { DollarSign, CheckCircle2, Clock, ArrowUpRight, TrendingUp } from "lucide-react";

interface DashboardMetrics {
    grossSales: number;
    reconciled: number;
    pending: number;
}

interface MetricCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBg: string;
    trend: string;
    isLoading: boolean;
}

export default function DashboardPage() {
    const [metrics, setMetrics] = useState<DashboardMetrics>({
        grossSales: 0,
        reconciled: 0,
        pending: 0,
    });
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const response = await api.get("/metrics/summary");
                
                setMetrics(response.data);
                setError("");

            } catch (err) {
                console.error("Erro ao buscar métricas:", err);
                setError("Não foi possível carregar os dados financeiros no momento.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(value);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Visão Geral</h1>
                    <p className="text-gray-500 mt-1.5 font-medium">Acompanhe o fluxo de caixa e o status das suas conciliações de hoje.</p>
                </div>
                
                <button className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 hover:text-purple-700 hover:border-purple-200 transition-all active:scale-95">
                    <ArrowUpRight className="w-4 h-4" />
                    Exportar Relatório
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <MetricCard 
                    title="Volume de Vendas (Bruto)" 
                    value={formatCurrency(metrics.grossSales)}
                    icon={<DollarSign className="w-6 h-6 text-purple-600" />}
                    iconBg="bg-purple-100"
                    trend="+12.5% vs mês passado"
                    isLoading={isLoading}
                />
                
                <MetricCard 
                    title="Capital Conciliado" 
                    value={formatCurrency(metrics.reconciled)}
                    icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                    iconBg="bg-emerald-100"
                    trend="Dinheiro validado na conta"
                    isLoading={isLoading}
                />
                
                <MetricCard 
                    title="Aguardando Liquidação" 
                    value={formatCurrency(metrics.pending)}
                    icon={<Clock className="w-6 h-6 text-amber-600" />}
                    iconBg="bg-amber-100"
                    trend="Necessita atenção"
                    isLoading={isLoading}
                />
            </div>

            <div className="mt-12 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center border-dashed">
                <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Gráfico de Performance</h3>
                <p className="text-gray-500 mt-2 max-w-md">Em breve: Acompanhe a evolução das suas receitas diárias e compare o volume de vendas x taxa de conciliação.</p>
            </div>

        </div>
    );
}

function MetricCard({ title, value, icon, iconBg, trend, isLoading }: MetricCardProps) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100/80 hover:shadow-md hover:border-purple-100 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    {icon}
                </div>
            </div>
            
            <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
                {isLoading ? (
                    <div className="h-9 bg-gray-100 animate-pulse rounded-lg w-3/4 mt-2"></div>
                ) : (
                    <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {value}
                    </h3>
                )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50">
                {isLoading ? (
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2"></div>
                ) : (
                    <p className="text-xs font-semibold text-gray-400">
                        {trend}
                    </p>
                )}
            </div>
        </div>
    );
}