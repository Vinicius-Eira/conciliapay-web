"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api"; 
import { DollarSign, CheckCircle2, Clock, ArrowUpRight, AlertCircle } from "lucide-react";
import { PerformanceChart } from "./components/PerformanceChart";
import { MobileStatusChart } from "./components/MobileStatusChart"; 
interface DashboardMetrics {
    grossSales: number;
    reconciled: number;
    pending: number;
}
interface PerformanceData {
    month: string;
    revenue: number;
    expenses: number;
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
    
    const [performance, setPerformance] = useState<PerformanceData[]>([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const [summaryResponse, performanceResponse] = await Promise.all([
                    api.get("/metrics/summary"),
                    api.get("/metrics/performance")
                ]);
                
                setMetrics(summaryResponse.data);
                setPerformance(performanceResponse.data);
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
            currency: 'BRL',
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 sm:pb-10 max-w-7xl mx-auto">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Visão Geral</h1>
                    <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-1.5 font-medium">Acompanhe o fluxo de caixa e status de conciliação.</p>
                </div>
                
                <button 
                    onClick={() => alert("🚧 Em breve: Exportação de relatórios em PDF/Excel")}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 sm:py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 hover:text-purple-700 hover:border-purple-200 transition-all active:scale-95"
                >
                    <ArrowUpRight className="w-4 h-4" />
                    Exportar Relatório
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 sm:py-4 rounded-xl text-sm font-medium flex items-start sm:items-center gap-3 shadow-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0 text-red-500" />
                    <p className="leading-snug">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <MetricCard 
                    title="Volume de Vendas (Bruto)" 
                    value={formatCurrency(metrics.grossSales)}
                    icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
                    iconBg="bg-purple-100"
                    trend="+12.5% vs mês passado"
                    isLoading={isLoading}
                />
                
                <MetricCard 
                    title="Capital Conciliado" 
                    value={formatCurrency(metrics.reconciled)}
                    icon={<CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />}
                    iconBg="bg-emerald-100"
                    trend="Dinheiro validado na conta"
                    isLoading={isLoading}
                />
                
                <MetricCard 
                    title="Aguardando Liquidação" 
                    value={formatCurrency(metrics.pending)}
                    icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />}
                    iconBg="bg-amber-100"
                    trend="Necessita atenção"
                    isLoading={isLoading}
                />
            </div>

            <div className="mt-8 sm:mt-12">
                {isLoading ? (
                    <div className="h-[300px] sm:h-[400px] w-full bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm flex items-center justify-center">
                        <div className="flex flex-col items-center animate-pulse">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full mb-4"></div>
                            <div className="h-3 sm:h-4 bg-gray-100 rounded w-32 sm:w-48"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {performance.length > 0 && (
                            <div className="hidden sm:block">
                                <PerformanceChart data={performance} />
                            </div>
                        )}

                        <div className="block sm:hidden">
                            <MobileStatusChart metrics={metrics} />
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}

function MetricCard({ title, value, icon, iconBg, trend, isLoading }: MetricCardProps) {
    return (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-gray-100/80 hover:shadow-md hover:border-purple-100 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    {icon}
                </div>
            </div>
            
            <div>
                <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-1 line-clamp-1" title={title}>
                    {title}
                </p>
                {isLoading ? (
                    <div className="h-7 sm:h-9 bg-gray-100 animate-pulse rounded-lg w-2/3 sm:w-3/4 mt-2"></div>
                ) : (
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight truncate" title={value}>
                        {value}
                    </h3>
                )}
            </div>

            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-50">
                {isLoading ? (
                    <div className="h-3 sm:h-4 bg-gray-100 animate-pulse rounded w-1/2"></div>
                ) : (
                    <p className="text-[11px] sm:text-xs font-semibold text-gray-400 truncate" title={trend}>
                        {trend}
                    </p>
                )}
            </div>
        </div>
    );
}