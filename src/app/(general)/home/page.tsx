"use client"

import { useAuth } from "@/components/auth/useAuth";
import Header from "@/components/header/Header";
import { useRouter } from "next/navigation";

export default function HomePage() {


    const router = useRouter();
    const { data, isError, isLoading } = useAuth()

    if (isLoading) {
        return 'Cargando ...'
    }
    if (isError) {
        router.replace('/login');
    }

    if (data) {
        const { nombre, rol } = data.data
        return (
            <div className='w-full h-screen flex flex-col bg-blue-100' >
                <Header />
                <div className="bg-white flex flex-col max-w-[300px] my-5 ml-3 p-5 rounded-lg">
                    <p className="font-bold">Usuario: {nombre} </p>
                    <p className="font-bold">Rol: {rol} </p>
                </div>
                <div className='w-full h-[400px]'>
                    page
                </div>
            </div>
        )
    }
}
