"use client"
import { ActiveData } from "@/types"
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image"
import { useRouter } from "next/navigation";


export default function Header({ nombre, rol }: ActiveData) {

    const queryClient = useQueryClient()
    const router = useRouter()

    function handleLogout() {
        localStorage.removeItem('AUTH_TOKEN');
        queryClient.invalidateQueries({ queryKey: ['user'] })
        router.replace('/login');

    }
    return (
        <header className='flex justify-between p-5 items-center bg-white'>
            <Image
                className="dark:invert"
                src="/logo.png"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <div className="flex items-center gap-x-12">
                {nombre && rol && (
                    <button onClick={handleLogout} type="button" className="border border-blue-800 bg-blue-800 text-white rounded-md px-3 cursor-pointer select-none">Cerrar Sesión</button>
                )

                }

                <p className="font-bold">Beneficios por renovar</p>
                {nombre && rol && (
                    <div>
                        <p className="font-bold text-blue-800">Bienvenido!</p>
                        <div className="mr-5">
                            <p className="text-gray-500 select-none text-[13px]"> <span className="font-bold">Usuario:</span> {nombre}</p>
                            <p className="text-gray-500 select-none text-[13px]"> <span className="font-bold">Rol: </span> {rol}</p>
                        </div>
                    </div>
                )

                }
            </div>

        </header>
    )
}
