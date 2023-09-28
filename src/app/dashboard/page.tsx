'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCookie, deleteCookie } from "cookies-next"
import api from "@/service/api"
import { SiReact, SiTypescript, SiNodedotjs, SiMongodb, SiTailwindcss, SiNextdotjs, SiExpress } from 'react-icons/si'
import {DiCode, DiGitBranch} from 'react-icons/di'

export default function Dashboard() {

    const [user, setUser] = useState<any>({})

    useEffect(() => {
        async function loadUser() {
            const token = getCookie('authorization')
            await api.get(`/user`, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((response) => {
                setUser(response.data)
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        loadUser();
    }, [])

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
                        Olá, <a href="#" className="special">{user.name}</a>
                    </h2>
                    <figure className="mt-10">
                        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                            <p>
                                Seja bem-vindo, essa aplicação tem o intuito de demonstrar meus conhecimentos. Nesse projeto usei as seguintes
                                tecnologias:
                            </p>
                        </blockquote>
                    </figure>
                </div>

                <div className="tech">
                    <details className="section-tech">
                        <summary><div>Front-End <DiCode size={28} color={'purple'}/> </div></summary>
                        <ul>
                            <li><SiTypescript/>TypeScript</li>
                            <li><SiReact/> React.Js</li>
                            <li><SiNextdotjs/>NextJs</li>
                            <li><SiTailwindcss/> TailWind CSS</li>
                        </ul>
                    </details>
                    <details className="section-tech">
                        <summary><div>Back-End <DiGitBranch size={20} color={'purple'}/> </div></summary>
                        <ul>
                            <li><SiNodedotjs/>Node.Js</li>
                            <li><SiExpress/>Express</li>
                            <li><SiMongodb/>MongoDB</li>
                        </ul>
                    </details>
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