"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";




import { TBusinessman } from "@/schemas";
import { changeStateBusinessman, deleteBusinessman } from "@/services/businessmanService";
import { useAuth } from "../auth/useAuth";
import { ActiveData } from "@/types";
import Link from "next/link";


export default function Row(businessman: TBusinessman) {

    const queryClient = useQueryClient();
    const { data } = useAuth()
    const userData: ActiveData = {
        nombre: '',
        rol: ''
    }
    if (data) {
        const { nombre, rol } = data.data
        userData.nombre = nombre;
        userData.rol = rol;
    }

    const mutationChangeState = useMutation({
        mutationFn: changeStateBusinessman,
        onError: (error) => {
            console.log("error: " + error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businessmans'] })
        }
    });

    const mutationDelete = useMutation({
        mutationFn: () => deleteBusinessman(businessman.id),
        onError: (error) => {
            console.log("error: " + error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['businessmans'] })
        }
    })

    

    async function handleChangeState() {
        await mutationChangeState.mutateAsync(businessman.id)
    }

    async function handleDelete() {
        await mutationDelete.mutateAsync()
    }
    return (
        <tr>
            <td className='border border-gray-500 text-center h-14 text-[12px]'>{businessman.nombre}</td>
            <td className='border border-gray-500 text-center h-14 text-[12px]'>{businessman.telefono}</td>
            <td className='border border-gray-500 text-center h-14 text-[12px]'>{businessman.correo}</td>
            <td className='border border-gray-500 text-center h-14 text-[12px]'>{new Date(businessman.fechaRegistro).toLocaleDateString()}</td>
            <td className='border border-gray-500 text-center h-14 text-[12px]'>{businessman.cantidadEstablecimientos}</td>
            <td className='border border-gray-500 text-center h-14 text-[12px] '><p className={`border w-[75%] rounded-xl h-[60%] flex justify-center items-center mx-auto ${businessman.estado ? "border-green-700 text-green-700" : "border-red-700 text-red-700"}`}>{businessman.estado ? 'Activo' : 'Inactivo'}</p></td>
            <td className='border border-gray-500 text-center h-14 text-[12px]'>

                <div className="flex justify-evenly">
                    <Link href={`/home/edit/${businessman.id}`} className="cursor-pointer"><FaEdit className="text-gray-600" size={17} /></Link>
                    <button onClick={handleChangeState} className="cursor-pointer"> {businessman.estado ? <MdCancel className="text-red-600" size={17} /> : <IoIosCheckmarkCircle className="text-green-600" size={17} />} </button>
                    { userData.rol === 'ADMIN' && (
                        <button onClick={handleDelete} className="cursor-pointer"><FaTrashAlt className="text-gray-600" size={17} /></button>
                    )

                    }
                </div>
            </td>
        </tr>
    )
}
