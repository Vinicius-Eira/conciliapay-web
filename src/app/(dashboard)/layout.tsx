"use client";

import { LayoutDashboard, Wallet, ArrowLeftRight, Settings, LogOut, User, Bell, Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    
    const [userName, setUserName] = useState("Carregando...");
    const [userInitial, setUserInitial] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove("conciliapay.token");
        router.push("/login");
    };

    const handleFeatureInDevelopment = (featureName: string) => {
        alert(`🚧 Funcionalidade em desenvolvimento: ${featureName}`);
    };

    useEffect(() => {
        const loadUserData = async () => {
            const token = Cookies.get("conciliapay.token");

            if (token) {
                try {
                    const decoded = jwtDecode<{ sub?: string }>(token)
                    const email = decoded.sub || "usuario@conciliapay.com";
                    
                    const namePart = email.split('@')[0];
                    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                    
                    setUserName(formattedName);
                    setUserInitial(formattedName.charAt(0).toUpperCase());
                } catch (error) {
                    console.error("Erro ao ler o token", error);
                    handleLogout();
                }
            } else {
                router.push("/login");
            }
        };
        loadUserData();
    }, [router]);

    const menuItems = [
        { name: "Visão Geral", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Transações", icon: Wallet, href: "/sales" },
        { name: "Conciliação Bancária", icon: ArrowLeftRight, href: "/dashboard/reconcile" },
        { name: "Ajustes da Conta", icon: Settings, href: "/dashboard/settings" },
    ];

    return (
        <div className="min-h-screen flex bg-[#FAFAFA] font-sans selection:bg-purple-200 selection:text-purple-900">
            
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-hidden="true" 
                />
            )}

            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0A0014] text-white flex flex-col shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                
                <div className="lg:hidden flex justify-end p-4">
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="text-gray-400 hover:text-white p-2"
                        aria-label="Fechar menu"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-8 lg:mt-6 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-bold tracking-wider text-purple-300/50 uppercase mb-4">Menu Principal</p>
                    
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                        
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href} 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group font-medium
                                    ${isActive 
                                        ? "bg-purple-600/10 text-purple-300 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-purple-400" : "group-hover:text-purple-300"}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 m-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-2 py-2">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20">
                            {userInitial ? userInitial : <User className="w-5 h-5" />}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{userName}</p>
                            <p className="text-xs text-purple-300/70">Admin Workspace</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center justify-center gap-2 mt-2 px-4 py-2.5 w-full rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all font-medium border border-transparent hover:border-red-500/20"
                    >
                        <LogOut className="w-4 h-4" />
                        Encerrar Sessão
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                
                <header className="h-[76px] bg-white/80 backdrop-blur-xl border-b border-gray-200/60 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 shadow-sm">
                    
                    <div className="flex items-center gap-4 flex-1">
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)} 
                            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                            aria-label="Abrir menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="hidden sm:flex items-center max-w-md w-full relative">
                            <Search className="w-5 h-5 absolute left-3 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Pesquisar transações, clientes..." 
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-600/20 focus:border-purple-400 outline-none transition-all text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-5">
                        <button 
                            onClick={() => handleFeatureInDevelopment("Central de Notificações")}
                            className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                            aria-label="Ver notificações"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>
                        
                        <div className="hidden sm:flex items-center gap-3 pl-5 border-l border-gray-200">
                             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-[#0A0014] flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:opacity-90 transition-opacity" title="Ajustes da Conta">
                                {userInitial ? userInitial : <User className="w-5 h-5" />}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
                    {children}
                </div>
            </main>
        </div>
    ); 
};