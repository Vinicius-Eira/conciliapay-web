"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import {
    Search,
    Filter,
    Download,
    MoreHorizontal,
    ArrowUpDown,
    AlertCircle,
    Wallet
} from "lucide-react";

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    paymentMethod: string;
    status: "CONCILIADO" | "PENDENTE" | "DIVERGENTE";
}

export default function SalesPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await api.get("/transactions");
                setTransactions(response.data);
                setError("");
            } catch (err) {
                console.error("Erro ao buscar transações:", err);
                setError("Não foi possível carregar a lista de transações.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchTransactions();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(dateString));
    };

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "CONCILIADO":
                return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold tracking-wide">CONCILIADO</span>;
            case "PENDENTE":
                return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold tracking-wide">PENDENTE</span>;
            case "DIVERGENTE":
                return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold tracking-wide">DIVERGENTE</span>;
            default:
                return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold tracking-wide">{status}</span>;
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Transações</h1>
                    <p className="text-gray-500 mt-1.5 font-medium">Gerencie suas vendas e acompanhe o status de liquidação.</p>
                </div>

                <button
                    onClick={() => alert("🚧 Em breve: Exportação de extrato")}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 hover:text-purple-700 hover:border-purple-200 transition-all active:scale-95"
                >
                    <Download className="w-4 h-4" />
                    Exportar
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por ID, descrição ou valor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600/20 focus:border-purple-400 outline-none transition-all text-sm font-medium"
                    />
                </div>

                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
                    <Filter className="w-4 h-4" />
                    Filtros Avançados
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl text-sm font-medium flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition-colors">
                                        Data e Hora <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Descrição</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Método</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Valor</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={index} className="animate-pulse">
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-48"></div></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-16"></div></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-20"></div></td>
                                        <td className="px-6 py-5"><div className="h-6 bg-gray-100 rounded-full w-24"></div></td>
                                        <td className="px-6 py-5"><div className="h-4 bg-gray-100 rounded w-8 ml-auto"></div></td>
                                    </tr>
                                ))
                            ) : transactions.length === 0 && !error ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                                <Wallet className="w-8 h-8 text-gray-400" />
                                            </div>
                                            <p className="font-semibold text-gray-900">Nenhuma transação encontrada</p>
                                            <p className="text-sm mt-1">As suas vendas aparecerão aqui assim que o sistema for integrado.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {formatDate(transaction.date)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {transaction.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {transaction.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                            {formatCurrency(transaction.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {renderStatusBadge(transaction.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                className="text-gray-400 hover:text-purple-600 transition-colors p-2 rounded-lg hover:bg-purple-50"
                                                aria-label="Mais opções"
                                            >
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && transactions.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
                        <span>Mostrando 1 a {transactions.length} de {transactions.length} resultados</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50">Anterior</button>
                            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50">Próxima</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}