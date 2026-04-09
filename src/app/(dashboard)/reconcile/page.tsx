"use client";

import { useState } from "react";
import { 
    CheckCircle2, 
    AlertCircle, 
    Search, 
    Landmark, 
    MonitorSmartphone, 
    ArrowRight,
    HelpCircle,
    Check
} from "lucide-react";

type TabType = 'todo' | 'divergences' | 'done';

export default function ReconcilePage() {
    const [activeTab, setActiveTab] = useState<TabType>('todo');

    const mockMatches = [
        {
            id: '1',
            bankItem: { date: 'Hoje, 10:45', description: 'PIX RECEBIDO - JOAO SILVA', amount: 350.00 },
            systemItem: { date: 'Hoje, 10:42', description: 'Venda #1042 - João Silva', amount: 350.00 },
            matchType: 'perfect',
            fee: 0
        },
        {
            id: '2',
            bankItem: { date: 'Hoje, 09:15', description: 'LIQUIDAÇÃO CIELO CRÉDITO', amount: 145.50 },
            systemItem: { date: 'Ontem, 15:30', description: 'Venda #1041 - Cartão de Crédito', amount: 150.00 },
            matchType: 'partial',
            fee: 4.50 
        },
        {
            id: '3',
            bankItem: { date: 'Ontem, 18:00', description: 'TRANSF BANCARIA NÃO IDENTIFICADA', amount: 850.00 },
            systemItem: null,
            matchType: 'none',
            fee: 0
        }
    ];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Conciliação Bancária</h1>
                    <p className="text-gray-500 mt-1.5 font-medium">Faça o match entre o extrato do banco e as vendas do sistema.</p>
                </div>
                
                <div className="flex gap-4">
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase">A Fazer</p>
                        <p className="text-xl font-extrabold text-purple-700">3</p>
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase">Divergências</p>
                        <p className="text-xl font-extrabold text-red-600">1</p>
                    </div>
                </div>
            </div>

            <div className="flex space-x-1 border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('todo')}
                    className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'todo' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    A Fazer (Prioridade)
                </button>
                <button 
                    onClick={() => setActiveTab('divergences')}
                    className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'divergences' ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Divergências
                </button>
                <button 
                    onClick={() => setActiveTab('done')}
                    className={`pb-4 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'done' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Conciliados
                </button>
            </div>

            {activeTab === 'todo' && (
                <div className="space-y-4">
                    
                    <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-6 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <div className="flex items-center gap-2"><Landmark className="w-4 h-4"/> Banco (Extrato)</div>
                        <div className="w-32 text-center">Status do Match</div>
                        <div className="flex items-center gap-2"><MonitorSmartphone className="w-4 h-4"/> Sistema (Vendas)</div>
                    </div>

                    {mockMatches.map((match) => (
                        <div key={match.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                            
                            <div className="flex-1 w-full bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-xs text-gray-500 font-medium mb-1">{match.bankItem.date}</p>
                                <p className="font-bold text-gray-900 text-sm truncate">{match.bankItem.description}</p>
                                <p className="text-lg font-black text-gray-900 mt-2">{formatCurrency(match.bankItem.amount)}</p>
                            </div>

                            <div className="flex flex-col items-center justify-center shrink-0 w-32 relative z-10">
                                {match.matchType === 'perfect' && (
                                    <>
                                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2 shadow-sm border border-emerald-200">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2 py-1 rounded-full">Match Perfeito</span>
                                    </>
                                )}
                                {match.matchType === 'partial' && (
                                    <>
                                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-2 shadow-sm border border-amber-200">
                                            <AlertCircle className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wide bg-amber-50 px-2 py-1 rounded-full text-center">Taxa Detectada</span>
                                    </>
                                )}
                                {match.matchType === 'none' && (
                                    <>
                                        <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-2 border border-gray-200">
                                            <HelpCircle className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide bg-gray-50 px-2 py-1 rounded-full">Sem Match</span>
                                    </>
                                )}
                                
                                <ArrowRight className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-8 w-5 h-5 text-gray-300" />
                                <ArrowRight className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-8 w-5 h-5 text-gray-300" />
                            </div>

                            <div className={`flex-1 w-full rounded-xl p-4 border ${match.matchType === 'none' ? 'bg-white border-dashed border-gray-300 flex flex-col items-center justify-center text-center h-full min-h-[100px]' : 'bg-purple-50/50 border-purple-100'}`}>
                                {match.systemItem ? (
                                    <>
                                        <p className="text-xs text-purple-600/70 font-medium mb-1">{match.systemItem.date}</p>
                                        <p className="font-bold text-purple-900 text-sm truncate">{match.systemItem.description}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-lg font-black text-purple-700">{formatCurrency(match.systemItem.amount)}</p>
                                            
                                            {match.fee > 0 && (
                                                <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-md">
                                                    - {formatCurrency(match.fee)} (Taxa)
                                                </span>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-6 h-6 text-gray-400 mb-2" />
                                        <p className="text-sm font-medium text-gray-600">Nenhuma venda encontrada</p>
                                        <button className="mt-2 text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline">
                                            Buscar Manualmente
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="w-full md:w-auto md:absolute md:right-4 md:top-1/2 md:-translate-y-1/2 md:opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-100">
                                <button 
                                    className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-bold text-white transition-all active:scale-95 ${
                                        match.matchType === 'perfect' ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' :
                                        match.matchType === 'partial' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' :
                                        'bg-gray-800 hover:bg-gray-900 hidden'
                                    }`}
                                >
                                    <Check className="w-5 h-5" />
                                    {match.matchType === 'partial' ? 'Aprovar com Taxa' : 'Aprovar Match'}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
            
            {activeTab !== 'todo' && (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
                    <p className="text-gray-500 font-medium">Nenhum item nesta lista no momento.</p>
                </div>
            )}
        </div>
    );
}