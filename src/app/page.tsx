'use client'
import Image from "next/image"
export default function Home() {

  return (
    <main >
      <div className="bg-white">
  
      <div className="relative isolate px-6 ">
        
        <div className="mx-auto max-w-2xl sm:py-48 ">
          
          <div className="text-center">
            <div className="flex items-center justify-center"> <Image src="/auth.png" alt="Logo" width={200} height={200}/> </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              SystemAuth
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Sistema de autenticação de criado por Pedro Leonardo, com intuito de demonstrar minhas habilidades em um projeto voltado
              para estudos.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </a>
              <a href="/register" className="text-sm font-semibold leading-6 text-gray-900">
                Registrar <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
    </main>
  )
}
