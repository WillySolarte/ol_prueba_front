"use client";

import { LoginData, LoginFormData } from "@/types"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService"
import { TUserLoginResponse } from "@/schemas";


export default function LoginForm() {

    const initialValues: LoginFormData = {
        correo: "",
        contrasena: "",
        terminos: false

    }
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({ defaultValues: initialValues })

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {

            const errorMessage = typeof error === "string" ? error : "Error desconocido";

            if (errorMessage.includes('Usuario')) {
                setError("correo", { type: "manual", message: errorMessage });
            } else {
                setError("contrasena", { type: "manual", message: errorMessage });
            }
        },
        onSuccess: (data: TUserLoginResponse) => {
            reset()
            localStorage.setItem('AUTH_TOKEN', data.access_token);
            router.replace('/home?page=1');

        }
    })


    function handleLogin(formData: LoginFormData) {

        const outData: LoginData = {
            correo: formData.correo,
            contrasena: formData.contrasena
        }

        mutate(outData)


    }

    return (


        <form className="w-[400px] mx-auto mt-[200px] border border-gray-300 rounded-2xl p-6 bg-white" onSubmit={handleSubmit(handleLogin)} noValidate>


            <h2 className=" text-center mb-4">Ingresa tu correo y contraseña para iniciar sesión</h2>
            <hr className=" border border-gray-200 my-6" />
            <div className="flex flex-col my-2">
                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="correo"> Correo </label>
                    <input className="w-full h-8 pl-2 focus:outline-none bg-white border border-gray-300 rounded-md" type="email" id="correo" placeholder="correo"
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
                <div className="flex flex-col">
                    <label className="font-bold" htmlFor="contrasena">Contraseña </label>
                    <input className="w-full h-8 pl-2 focus:outline-none bg-white border border-gray-300 rounded-md" type='password' id="contrasena" placeholder="Contraseña"
                        {...register("contrasena", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 7,
                                message: "Debe ser mínimo de 7 caracteres",
                            }

                        })}
                    />
                </div>
                <p className="text-red-600 text-sm my-1 h-5"> {errors.contrasena ? `${errors.contrasena.message}` : ''} </p>
            </div>
            <div className="flex items-center my-4">
                <input
                    type="checkbox"
                    id="terminos"
                    className="mr-2"
                    {...register("terminos", {
                        required: "Debes aceptar los términos y condiciones",
                    })}
                />
                <label htmlFor="terminos" className="text-sm select-none">Acepto los <span className="text-blue-600 underline cursor-pointer">términos y condiciones</span></label>
            </div>
            <p className="text-red-600 text-sm my-1 h-5"> {errors.terminos?.message || ''} </p>


            <button type="submit" className="bg-rose-600 text-white w-full my-2 h-9 rounded-md hover:bg-rose-500 select-none cursor-pointer">Iniciar sesión</button>



        </form>


    )
}
