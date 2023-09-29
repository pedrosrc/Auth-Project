'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import api from "@/service/api";
import Image from "next/image"

export default function Login() {

    const [emailUser, setEmailUser] = useState<string>('');
    const [passwordUser, setPasswordUser] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<any>({});
    const [pending, setPending] = useState<boolean>(false);
    const router = useRouter();

    async function handleLogin(e: any) {
        e.preventDefault();
        setPending(true);
        if (!emailUser && !passwordUser) {
            return alert('Digite seus dados corretamente!')
        }

        await api.post('auth/login', {
            email: emailUser,
            password: passwordUser
        }).then((response) => {
            setCookie('authorization', response.data)
            router.push('/dashboard') 
            setPending(false)
        }).catch((error) => {
            setTimeout(() => {
                setErrorMsg(error.response.data);
            }, 3000);
            setPending(false);
        })

    }

    return (
        <main className="container_background">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex items-center justify-center"> <Image src="/auth.png" alt="Logo" width={100} height={100} /> </div>
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
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Esqueceu sua senha?
                                    </a>
                                </div> */}
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
                            {pending ? <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Entrando...
                            </button> :
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Entrar
                                </button>
                            }
                        </div>
                        <div>
                            {errorMsg ? <p className="error-msg">{errorMsg.msg}</p> : errorMsg}
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Não tem uma conta ?{' '}
                        <a href="/register" target="_self" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Registre-se
                        </a>
                    </p>
                </div>
            </div>
        </main>
    )
}