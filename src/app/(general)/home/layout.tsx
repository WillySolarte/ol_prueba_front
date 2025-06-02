"use client"

import { useAuth } from "@/components/auth/useAuth";
import AlertDelete from "@/components/auxiliar/AlertDelete";
import Header from "@/components/header/Header";
import { ActiveData } from "@/types";
import { useRouter } from "next/navigation";

export default function HomeLayout({ children }: { children: React.ReactNode; }) {

    const router = useRouter();
    const { data, isError, isLoading } = useAuth()

    if (isLoading) {
        return 'Cargando ...'
    }
    if (isError) {
        router.replace('/login');
    }

    if(data){
        const { nombre, rol } = data.data
        const userData: ActiveData = {
            nombre,
            rol
        }
        return (
        <div>
            <Header {...userData} />
            {children}
        </div>
    );

    }

    
}