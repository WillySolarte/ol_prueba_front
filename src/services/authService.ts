import api from "@/lib/axios"
import { userActiveSchema, userLoginResponseSchema } from "@/schemas"
import { LoginData } from "@/types"
import { isAxiosError } from "axios"




export async function login(formData: LoginData){

    try {
        const url = `/auth/login`
        const {data} = await api.post(url, formData)
        const response = userLoginResponseSchema.safeParse(data)
        if(response.success){
            
            return response.data
        }
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            
            throw error.response.data.message;
        }
    }
}

export async function getUserActive(){

    try {
        const url = `/user/user/active`
        const {data} = await api.get(url)
        const response = userActiveSchema.safeParse(data)
        if(response.success){
            
            return response.data
        }
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            
            throw error.response.data.message;
        }
    }
}