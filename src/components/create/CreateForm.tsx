"use client"

import { TMunicipalities } from "@/schemas"
import { createBusinessmanData, getMunicipalities } from "@/services/businessmanService"
import { TCreateBusinessman } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function CreateForm() {

    const initialValues: TCreateBusinessman = {
        nombre: '',
        telefono: '',
        correo: '',
        estado: true,
        municipio: "",
        fechaRegistro: ""

    }
    const router = useRouter();
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const { data, isLoading, isError } = useQuery<TMunicipalities>({
        queryKey: ['municipality'],
        queryFn: getMunicipalities,
    })

    function handleCreate(dataForm: TCreateBusinessman){
        
        mutate(dataForm)
    }

    const {mutate} = useMutation({
        mutationFn: createBusinessmanData,
        onError: (error) => {
            console.log("error: " + error)
        },
        onSuccess: () => {
            reset()
            queryClient.invalidateQueries({ queryKey: ['businessmans'] })
            router.replace("/home")
        }
    })

    if (isLoading) return (
        <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-2xl font-bold">Cargando...</h1>
        </div>
    )
    if (isError) router.replace("/home")


    if (data) return (
        <form onSubmit={handleSubmit(handleCreate)}  className="flex flex-col items-center lg:items-start lg:flex-row border bg-white border-gray-400 rounded-lg w-[400px] md:w-[600px] lg:w-[80%] xl:w-[70%] justify-evenly py-5" noValidate>

            <div className="flex flex-col m-4">
                <div className="flex flex-col my-2">
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="nombre"> Nombre * </label>
                        <input className="w-[300px] h-8 pl-2 focus:outline-none bg-white border border-gray-300  rounded-md" type="text" id="nombre" placeholder="nombre"
                            {...register("nombre", {
                                required: "El nombre es obligatorio",

                            })}

                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.nombre ? `${errors.nombre.message}` : ''} </p>
                </div>
                <div className="flex flex-col my-2">
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="municipio"> Municipio * </label>
                        <select
                            id="municipio"
                            className="w-[300px] h-8 pl-2 focus:outline-none bg-white border border-gray-300 rounded-md"
                            {...register("municipio", {
                                required: "El municipio es obligatorio",
                            })}
                        >

                            <option value="">Seleccione un municipio</option>
                            {data.map(municipality => (
                                <option key={municipality.id} value={municipality.id}>
                                    {municipality.nombre}
                                </option>
                            ))}

                        </select>
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.municipio ? `${errors.municipio.message}` : ''} </p>
                </div>
                <div className="flex flex-col my-2">
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="telefono"> Teléfono </label>
                        <input className="w-[300px] h-8 pl-2 focus:outline-none bg-white border border-gray-300  rounded-md" type="text" id="telefono" placeholder="teléfono"
                            {...register("telefono", {


                            })}

                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.telefono ? `${errors.telefono.message}` : ''} </p>
                </div>
            </div>
            <div className="flex flex-col m-4">
                <div className="flex flex-col my-2">
                    <div className="flex flex-col">
                        <label className="font-bold" htmlFor="correo"> Correo </label>
                        <input className="w-[300px] h-8 pl-2 focus:outline-none bg-white border border-gray-300 rounded-md" type="email" id="correo" placeholder="correo"
                            {...register("correo", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}

                        />
                    </div>
                    <p className="text-red-600 text-sm my-1 h-5"> {errors.correo ? `${errors.correo.message}` : ''} </p>
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="fechaRegistro" className="font-bold">
                        Fecha de Registro *
                    </label>
                    <input
                        type="date"
                        id="fechaRegistro"
                        className="w-[300px] h-8 pl-2 focus:outline-none bg-white border border-gray-300 rounded-md"
                        {...register("fechaRegistro", {
                            required: "La fecha de registro es obligatoria",
                        })}
                    />
                    <p className="text-red-600 text-sm my-1 h-5">
                        {errors.fechaRegistro?.message}
                    </p>
                    <button type="submit" className="bg-rose-600 cursor-pointer font-bold text-white rounded-lg h-10">Enviar Formulario</button>
                </div>
            </div>


        </form>
    )
}
