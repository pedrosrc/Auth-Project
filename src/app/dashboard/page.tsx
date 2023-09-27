'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useJwt } from "react-jwt";
import { getCookie, deleteCookie } from "cookies-next"
import api from "@/service/api"

export default function Dashboard() {
    

    // const { token } = req.query;

    // try {
    // const response = await axios.get('URL_DA_SUA_API_AQUI', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // const userId = response.data.userId;
    const [user, setUser] = useState<any[]>([])

    useEffect(()=>{
        async function loadUser() {
            const token = getCookie('authorization')
            const response = api.get(`/user/`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        }
        loadUser();
    },[]);

    const router = useRouter();
    async function handleLogout() {
        
        deleteCookie('token')
        router.push('/login')
    }

    return (
        <main>
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Olá, <a href="#" className="special">Pedro</a>
                    </h2>
                    <figure className="mt-10">
                        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                            <p>
                                Essa aplicação de autenticação serve para demonstrar meus conhecimentos, feita 100% por <a href="https://www.linkedin.com/in/pedroleodev/" target="_blank" className="special">Pedro Leonardo</a>. No Front-End utilizei: TypeScript, React.Js, Next.Js e TailWind CSS, e no Back-End: Node.Js e MongoDB.
                            </p>
                        </blockquote>
                    </figure>
                </div>
                <div>
                    <button
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 max-width"
                    onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </section>
        </main>
    )
}