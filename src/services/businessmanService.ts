import api from "@/lib/axios"
import { buisnessmanToEditSchema, businesmanChangeStateResponseSchema, bussinesmansResponseSchema, createBusinesmannResponseSchema, deleteBusinesmannResponseSchema, editBusinesmannResponseSchema, municipalitiesResponseSchema } from "@/schemas"
import { TCreateBusinessman, TEditBs } from "@/types"
import { isAxiosError } from "axios"

export async function getBusinessman(take: number, page: number){

    try {
        const url = `/businessman/all/${take}/${page}`
        const {data} = await api.get(url)
        const response = bussinesmansResponseSchema.safeParse(data)
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

export async function changeStateBusinessman(id: number){

    try {
        const url = `/businessman/change-state/${id}`
        const {data} = await api.patch(url)
        const response = businesmanChangeStateResponseSchema.safeParse(data)
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

export async function deleteBusinessman(id: number){

    try {
        const url = `/businessman/${id}`
        const {data} = await api.delete(url)
        
        const response = deleteBusinesmannResponseSchema.safeParse(data)
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

export async function getBusinessmanById(id: number){

    try {
        const url = `/businessman/${id}`
        const {data} = await api.get(url)
        const response = buisnessmanToEditSchema.safeParse(data)
        if(response.success){
            return response.data.data
        }
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            
            throw error.response.data.message;
        }
    }
}

export async function getMunicipalities(){

    try {
        const url = `/municipality`
        const {data} = await api.get(url)

        const response = municipalitiesResponseSchema.safeParse(data)
        if(response.success){
            return response.data.data
        }
        
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            
            throw error.response.data.message;
        }
    }
}
type TEditProps = {
    dataFormSend: TEditBs,
    id: number
}  

export async function editBusinessmanData({dataFormSend, id}: TEditProps){

    
    try {
        const url = `/businessman/${id}`
        const {data} = await api.patch(url, dataFormSend)
        const response = editBusinesmannResponseSchema.safeParse(data)
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

export async function createBusinessmanData(dataForm: TCreateBusinessman){

    const dataSend = {
        ...dataForm,
        fechaRegistro: new Date(dataForm.fechaRegistro).toISOString(),
        municipio: +dataForm.municipio
    }

    
    try {
        const url = `/businessman`
        const {data} = await api.post(url, dataSend)
        const response = createBusinesmannResponseSchema.safeParse(data)
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