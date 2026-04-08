"use client";

import { useState } from "react";
import {
    User, Lock, Bell, Camera, Save, Loader2, Plug, Link as LinkIcon,
    Mail, KeyRound, Building2, ShieldCheck, CreditCard, ChevronRight
} from "lucide-react";

type TabType = "profile" | "security" | "notifications" | "integrations";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ElementType;
    label: string;
    htmlFor: string;
}

const InputField = ({ icon: Icon, label, htmlFor, ...props }: InputFieldProps) => (
    <div className="group">
        <label htmlFor={htmlFor} className="block text-sm font-semibold text-slate-700 mb-2 transition-colors group-focus-within:text-purple-600">
            {label}
        </label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-600 transition-transform group-focus-within:scale-110" />
            <input
                {...props}
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 focus:bg-white focus:ring-[3px] focus:ring-purple-600/10 focus:border-purple-500 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 text-sm font-medium shadow-sm shadow-slate-100/50 ${props.disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200 hover:border-slate-200 shadow-none' : ''}`}
            />
        </div>
    </div>
);

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>("profile");
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState("Felipe");
    const [email, setEmail] = useState("felipe@conciliapay.com");
    const [company, setCompany] = useState("F&F Strength & Conditioning");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert("✅ Configurações salvas com sucesso!");
        }, 1500);
    };

    const handleConnectGateway = (gatewayName: string) => {
        alert(`🚧 Em breve: Redirecionando para autorização segura do ${gatewayName}.`);
    };

    const gateways = [
        { id: 'stripe', name: 'Stripe', desc: 'Sincronização de vendas e taxas em tempo real.', color: '#635BFF', letter: 'S' },
        { id: 'mercadopago', name: 'Mercado Pago', desc: 'Integração completa com PIX e recebimentos.', color: '#009EE3', letter: 'MP' },
        { id: 'pagarme', name: 'Pagar.me', desc: 'Conciliação de recebíveis e antecipações.', color: '#79C143', letter: 'P' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

            {/* Cabeçalho */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight cursor-default">Ajustes da Conta</h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg cursor-default">Gerencie suas preferências e integrações da plataforma.</p>
                </div>

                {activeTab === "profile" && (
                    <button type="submit" form="profile-form" disabled={isLoading} className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 text-sm">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                        Salvar Alterações
                    </button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                <aside className="w-full lg:w-72 shrink-0 space-y-2 sticky top-28 bg-white p-3 rounded-3xl ring-1 ring-slate-900/5 shadow-xl shadow-slate-200/40">
                    {[
                        { id: "profile", name: "Meu Perfil", icon: User, desc: "Dados pessoais" },
                        { id: "security", name: "Segurança", icon: Lock, desc: "Senhas e 2FA" },
                        { id: "integrations", name: "Integrações", icon: Plug, desc: "Stripe, Mercado Pago" },
                        { id: "notifications", name: "Notificações", icon: Bell, desc: "E-mails e Alertas" },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`flex w-full items-center gap-4 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 group hover:translate-x-1
                                ${activeTab === tab.id
                                    ? "bg-purple-50 ring-1 ring-purple-100"
                                    : "hover:bg-slate-50"
                                }`}
                        >
                            <div className={`p-2.5 rounded-xl transition-all duration-300 ${activeTab === tab.id ? "bg-white text-purple-600 shadow-sm ring-1 ring-purple-100 scale-110" : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm group-hover:text-purple-500"}`}>
                                <tab.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className={`font-bold text-sm transition-colors ${activeTab === tab.id ? "text-purple-900" : "text-slate-700 group-hover:text-slate-900"}`}>{tab.name}</p>
                                <p className={`text-xs font-medium transition-colors ${activeTab === tab.id ? "text-purple-600/70" : "text-slate-400"}`}>{tab.desc}</p>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-all duration-300 ${activeTab === tab.id ? "text-purple-400 translate-x-1" : "text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2"}`} />
                        </button>
                    ))}
                </aside>

                <main className="flex-1 w-full min-w-0">

                    {activeTab === "profile" && (
                        <form id="profile-form" onSubmit={handleSave} className="bg-white rounded-3xl ring-1 ring-slate-900/5 shadow-xl shadow-slate-200/40 p-8 sm:p-10 animate-in fade-in duration-500 space-y-10">

                            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
                                <div className="relative group shrink-0">
                                    <div className="w-28 h-28 rounded-3xl bg-slate-900 flex items-center justify-center text-white text-5xl font-extrabold shadow-lg overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:-translate-y-1">
                                        {name.charAt(0)}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-md">
                                            <Camera className="w-8 h-8 text-white mb-2 group-hover:scale-110 transition-transform" />
                                            <span className="text-[11px] text-white font-bold tracking-widest uppercase">Alterar</span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110" title="Conta Ativa">
                                        <ShieldCheck className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                                <div className="text-center sm:text-left flex-1">
                                    <h2 className="text-2xl font-extrabold text-slate-900">{name}</h2>
                                    <p className="text-slate-500 font-medium">Administrador</p>
                                    <div className="flex gap-2.5 mt-4 justify-center sm:justify-start">
                                        <button type="button" className="px-4 py-2 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">Upload</button>
                                        <button type="button" className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-all duration-300 hover:-translate-y-0.5">Remover</button>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-400 max-w-[140px] text-center sm:text-right cursor-default">JPG, PNG ou GIF. Máx 2MB.</div>
                            </div>

                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        id="fullName"
                                        htmlFor="fullName"
                                        label="Nome de Exibição"
                                        icon={User}
                                        type="text"
                                        value={name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)} />
                                    <InputField
                                        id="corporateEmail"
                                        htmlFor="corporateEmail"
                                        label="E-mail de Acesso"
                                        icon={Mail}
                                        type="email"
                                        value={email}
                                        disabled
                                    />
                                    <div className="md:col-span-2">
                                        <InputField
                                            id="companyName"
                                            htmlFor="companyName"
                                            label="Nome do Estabelecimento"
                                            icon={Building2}
                                            type="text"
                                            value={company}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}

                    {activeTab === "security" && (
                        <div className="bg-white rounded-3xl ring-1 ring-slate-900/5 shadow-xl shadow-slate-200/40 p-8 sm:p-10 animate-in fade-in duration-500">
                            <div className="flex items-start gap-5 mb-8 pb-8 border-b border-slate-100 group cursor-default">
                                <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl ring-1 ring-orange-100 transition-transform duration-500 group-hover:rotate-12">
                                    <KeyRound className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Segurança da Conta</h2>
                                    <p className="text-sm text-slate-500 mt-1">Atualize sua senha periodicamente para manter sua conta segura.</p>
                                </div>
                            </div>

                            <div className="space-y-6 max-w-xl">
                                <InputField
                                    id="currentPassword"
                                    htmlFor="currentPassword"
                                    label="Senha Atual"
                                    icon={KeyRound}
                                    type="password"
                                    placeholder="••••••••••••"
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                    <InputField
                                        id="newPassword"
                                        htmlFor="newPassword"
                                        label="Nova Senha"
                                        icon={Lock}
                                        type="password"
                                        placeholder="••••••••••••"
                                    />
                                    <InputField
                                        id="confirmPassword"
                                        htmlFor="confirmPassword"
                                        label="Confirmar Senha"
                                        icon={Lock}
                                        type="password"
                                        placeholder="••••••••••••"
                                    />
                                </div>
                                <div className="pt-6">
                                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 text-sm">
                                        Atualizar Senha
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "integrations" && (
                        <div className="bg-white rounded-3xl ring-1 ring-slate-900/5 shadow-xl shadow-slate-200/40 p-8 sm:p-10 animate-in fade-in duration-500">

                            <div className="mb-8 cursor-default">
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gateways de Pagamento</h2>
                                <p className="text-sm text-slate-500 mt-1">Sincronize as fontes das suas vendas automaticamente.</p>
                            </div>

                            <div className="space-y-4">
                                {gateways.map((gateway) => (
                                    <div key={gateway.id} className="relative overflow-hidden bg-slate-50 rounded-3xl p-1 ring-1 ring-slate-200 hover:ring-purple-300 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative bg-white rounded-[22px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300">
                                            <div className="flex items-center gap-6 w-full sm:w-auto">
                                                <div
                                                    className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ring-1 shadow-inner transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                                                    style={{ backgroundColor: `${gateway.color}0D`, borderColor: `${gateway.color}1A` }} // 0D e 1A são opacidades em Hex
                                                >
                                                    <span className="font-black text-4xl tracking-tighter" style={{ color: gateway.color }}>{gateway.letter}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-extrabold text-slate-900 text-xl tracking-tight transition-colors group-hover:text-purple-900">{gateway.name}</h3>
                                                    <p className="text-sm text-slate-500 mt-1 font-medium">{gateway.desc}</p>

                                                    <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition-colors group-hover:bg-purple-50 group-hover:text-purple-600">
                                                        <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-purple-500 group-hover:animate-pulse"></div>
                                                        Desconectado
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleConnectGateway(gateway.name)}
                                                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 text-white rounded-2xl font-bold text-sm transition-all duration-300 shadow-xl active:scale-95 hover:shadow-2xl hover:-translate-y-1"
                                                style={{ backgroundColor: gateway.color, boxShadow: `0 10px 15px -3px ${gateway.color}33` }}
                                            >
                                                <LinkIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                Conectar {gateway.name}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 bg-slate-50/50 border-2 border-slate-200 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 cursor-default group">
                                <div className="p-5 bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 mb-5 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md">
                                    <CreditCard className="w-8 h-8 text-slate-400 group-hover:text-purple-400 transition-colors" />
                                </div>
                                <h4 className="font-extrabold text-slate-900 text-lg">Novas plataformas a caminho</h4>
                                <p className="text-sm text-slate-500 mt-2 max-w-sm font-medium">As integrações com NuPay e bancos tradicionais estão em fase de testes e serão liberadas em breve.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="bg-white rounded-3xl ring-1 ring-slate-900/5 shadow-xl shadow-slate-200/40 p-16 flex flex-col items-center justify-center text-center animate-in fade-in duration-500 cursor-default">
                            <div className="relative mb-6 group">
                                <div className="absolute inset-0 bg-purple-100 rounded-full blur-xl opacity-50 animate-pulse group-hover:opacity-75 transition-opacity"></div>
                                <div className="relative p-6 bg-purple-50 text-purple-500 rounded-full ring-1 ring-purple-100 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                                    <Bell className="w-12 h-12" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Notificações Inteligentes</h2>
                            <p className="text-slate-500 max-w-md mx-auto mt-3 font-medium">Configure como você deseja ser avisado sobre divergências críticas e conciliações automáticas.</p>

                            <div className="mt-8 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors">
                                🚧 Módulo em desenvolvimento
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}