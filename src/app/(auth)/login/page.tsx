"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import Image from "next/image";
import { Loader2, ArrowRight, CheckCircle2, ShieldCheck, Mail, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { isAxiosError } from "axios";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const { token } = response.data;

            Cookies.set("conciliapay.token", token, { expires: 1 });

            setSuccess(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);

        } catch (err) {
            if (isAxiosError(err)) {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setError("E-mail ou senha incorretos.");
                } else {
                    setError(err.response?.data ? String(err.response.data) : "Erro ao conectar com o servidor.");
                }
            } else {
                setError("Ocorreu um erro inesperado. Tente novamente.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#0A0014] lg:bg-[#FAFAFA] font-sans selection:bg-purple-400 selection:text-white">

            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#2D0B5A] via-[#4F1380] to-[#0A0014] relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse duration-10000"></div>

                <div className="relative z-10 text-center px-12 max-w-2xl flex flex-col items-center">
                    <div className="relative mb-14 w-full flex justify-center group cursor-default">
                        <div className="absolute inset-0 bg-fuchsia-400 blur-[100px] opacity-30 rounded-full animate-pulse transition-opacity duration-1000 group-hover:opacity-60"></div>
                        <Image
                            src="/logo_cp.png"
                            alt="Conciliapay Logo 3D"
                            width={480}
                            height={480}
                            className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.7)] transition-all duration-1000 ease-out group-hover:-translate-y-6 group-hover:scale-105 relative z-10"
                            priority
                        />
                    </div>

                    <div className={`transition-all duration-1000 transform ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-6 leading-tight tracking-tight drop-shadow-sm">
                            Bem-vindo de volta ao controle absoluto.
                        </h1>
                        <p className="text-purple-200/80 text-lg leading-relaxed font-light max-w-lg mx-auto">
                            Acesse a Conciliapay e continue otimizando seus recebimentos com tecnologia de ponta e segurança de nível bancário.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-screen lg:min-h-0 bg-gradient-to-br from-[#2D0B5A] via-[#3B0B73] to-[#0A0014] lg:bg-none lg:bg-white lg:rounded-l-3xl shadow-2xl lg:shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-20 p-6 sm:p-12 overflow-hidden">

                <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 lg:hidden"></div>

                <div className="w-full max-w-md relative z-10">

                    <div className="lg:hidden flex flex-col items-center text-center mb-10 pt-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-fuchsia-400 blur-[40px] opacity-40 rounded-full"></div>
                            <Image
                                src="/logo_cp.png"
                                alt="Conciliapay Logo"
                                width={130}
                                height={130}
                                className="drop-shadow-[0_20px_20px_rgba(0,0,0,0.6)] animate-in zoom-in duration-700 relative z-10 mb-6"
                            />
                        </div>
                        <h1 className={`text-3xl font-extrabold text-white mb-2 tracking-tight transition-all duration-700 delay-100 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                            Bem-vindo de volta.
                        </h1>
                        <p className={`text-purple-200/80 text-sm font-medium flex items-center justify-center gap-2 transition-all duration-700 delay-200 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Acesso seguro e criptografado
                        </p>
                    </div>

                    <div className={`hidden lg:block mb-10 transition-all duration-700 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Acesse sua conta</h2>
                        <p className="text-gray-500 flex items-center gap-2 font-medium">
                            <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            Entre para gerenciar suas conciliações.
                        </p>
                    </div>

                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 lg:bg-emerald-50/90 border border-emerald-500/30 text-emerald-800 rounded-2xl flex items-center gap-3 animate-in fade-in zoom-in slide-in-from-top-4 duration-500 backdrop-blur-md">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 lg:text-emerald-600 flex-shrink-0" />
                            <p className="text-sm font-semibold text-emerald-100 lg:text-emerald-800">Autenticado com sucesso! Redirecionando...</p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 lg:bg-red-50 border border-red-500/30 lg:border-red-200 text-red-200 lg:text-red-700 rounded-2xl flex items-center gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-md">
                            <AlertCircle className="w-5 h-5 text-red-400 lg:text-red-500 flex-shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">

                        <div className={`transition-all duration-700 delay-100 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <label className="block text-sm font-bold mb-1.5 ml-1 text-purple-100 lg:text-gray-700">
                                E-mail de Acesso
                            </label>
                            <div className="relative group text-purple-300/70 lg:text-gray-400 focus-within:text-white lg:focus-within:text-[#6A1B9A]">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 lg:py-3.5 rounded-2xl outline-none transition-all duration-300 text-base font-medium 
                                               bg-white/5 border border-white/10 text-white placeholder-purple-300/50 focus:bg-white/10 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 backdrop-blur-md
                                               lg:bg-gray-50/50 lg:border-gray-200 lg:text-gray-900 lg:placeholder-gray-400 lg:hover:bg-gray-50 lg:focus:bg-white lg:focus:border-purple-600 lg:focus:ring-purple-600/10 lg:backdrop-blur-none"
                                    placeholder="voce@suaempresa.com.br"
                                    required
                                    disabled={isLoading || success}
                                />
                            </div>
                        </div>

                        <div className={`transition-all duration-700 delay-200 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <div className="flex items-center justify-between mb-1.5 ml-1 mr-1">
                                <label className="block text-sm font-bold text-purple-100 lg:text-gray-700">
                                    Senha
                                </label>
                                <Link href="#" className="text-sm font-semibold text-purple-300 lg:text-[#6A1B9A] hover:text-white lg:hover:text-[#4A148C] hover:underline transition-colors">
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <div className="relative group text-purple-300/70 lg:text-gray-400 focus-within:text-white lg:focus-within:text-[#6A1B9A]">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 lg:py-3.5 rounded-2xl outline-none transition-all duration-300 text-base font-medium 
                                               bg-white/5 border border-white/10 text-white placeholder-purple-300/50 focus:bg-white/10 focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 backdrop-blur-md
                                               lg:bg-gray-50/50 lg:border-gray-200 lg:text-gray-900 lg:placeholder-gray-400 lg:hover:bg-gray-50 lg:focus:bg-white lg:focus:border-purple-600 lg:focus:ring-purple-600/10 lg:backdrop-blur-none"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading || success}
                                />
                            </div>
                        </div>

                        <div className={`pt-4 lg:pt-2 transition-all duration-700 delay-300 ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <button
                                type="submit"
                                disabled={isLoading || success || !email || !password}
                                className="group w-full font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2
                                           bg-purple-500 hover:bg-purple-400 text-white shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_30px_rgba(168,85,247,0.4)] border border-purple-400/50
                                           lg:bg-gradient-to-r lg:from-[#5B1487] lg:to-[#3B0B73] lg:hover:from-[#4A0F6E] lg:hover:to-[#2B0854] lg:shadow-[0_10px_20px_rgba(91,20,135,0.25)] lg:hover:shadow-[0_15px_30px_rgba(91,20,135,0.35)] lg:border-none
                                           disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] lg:hover:scale-[1.03]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <span>Acessando sistema...</span>
                                    </>
                                ) : (
                                    <>
                                        Entrar na Plataforma
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className={`mt-10 text-center transition-all duration-700 delay-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-sm font-medium text-purple-200/60 lg:text-gray-500">
                            Ainda não tem acesso?{" "}
                            <Link href="/register" className="text-white lg:text-[#6A1B9A] font-bold hover:text-purple-300 lg:hover:text-[#4A148C] hover:underline transition-colors ml-1">
                                Crie sua conta aqui
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}