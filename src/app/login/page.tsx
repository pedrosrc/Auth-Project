'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import api from "@/service/api";

export default function Login() {

    

    const [emailUser, setEmailUser] = useState<string>('')
    const [passwordUser, setPasswordUser] = useState<string>('')
    const router = useRouter();

    async function handleLogin() {
        
        if(!emailUser && !passwordUser){
            return alert('Digite seus dados corretamente!')
        }

        const response = await api.post('auth/login',{
            body: JSON.stringify({
                emailUser,
                passwordUser})
        })
        .then(()=>{
            setCookie('authorization', response)
            router.push('/dashboard')
        })
        .catch((error)=>{
            console.log(error)
        })
        
    }

    return (
        <main className="container_background">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Entrar com sua conta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" onSubmit={handleLogin} method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={emailUser}
                                    onChange={(e) => setEmailUser(e.target.value)}
                                    placeholder="Digite seu email"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha:
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Esqueceu sua senha?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={passwordUser}
                                    onChange={(e) => setPasswordUser(e.target.value)}
                                    placeholder="Digite sua senha"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                               Entrar
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Não tem uma conta ?{' '}
                        <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Registre-se
                        </a>
                    </p>
                </div>
            </div>
        </main>
    )
}