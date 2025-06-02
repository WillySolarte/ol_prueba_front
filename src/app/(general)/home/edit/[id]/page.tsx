"use client"

import Title from "@/components/auxiliar/Title";
import EditForm from "@/components/edit/EditForm";
import { TBusinessmanEditGetData } from "@/schemas";
import { getBusinessmanById } from "@/services/businessmanService";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import z from "zod";



export default function EditPage() {

    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const idSchema = z.coerce.number().int().positive();

    const result = idSchema.safeParse(id);
    if (!result.success) {
        router.replace("/home");
    }


    const { data, isLoading, isError } = useQuery({
        queryKey: ['onebusinessman', idSchema],
        queryFn: () => getBusinessmanById(result.data!),
        enabled: !!result.data
    })
    if (isLoading) return (
        <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-2xl font-bold">Cargando...</h1>
        </div>
    )
    if (isError) return router.replace("/home");

    


    if (data) {
        const dataType: TBusinessmanEditGetData = data;

        


        return (
            <div className='w-full h-screen flex flex-col bg-blue-100' >

                <Title text={`${dataType.nombre}`} />
                <div className='w-full flex flex-col items-center'>
                    <EditForm {...dataType} />
                </div>
                
            </div>
        )
    }
}