"use client"

import { getBusinessman, getCSV } from "@/services/businessmanService"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, useState } from "react"
import { useSearchParams } from "next/navigation"
import { TPaginationData } from "@/schemas"
import Row from "../auxiliar/Row"
import Link from "next/link"
import { useAuth } from "../auth/useAuth"

export default function TableBusinessman() {



  const searchParams = useSearchParams()

  const queryClient = useQueryClient()


  const [take, setTake] = useState(5);
  const page = Number(searchParams.get('page')) || 1;

  const { data: userActive } = useAuth()


  const { data, isLoading } = useQuery({
    queryKey: ['businessmans', take, page],
    queryFn: () => getBusinessman(take, page)
  })

  function handleChangeItems(evt: ChangeEvent<HTMLSelectElement>) {
    setTake(Number(evt.target.value))
    queryClient.invalidateQueries({ queryKey: ['businessmans'] })

  }
  function generateCSVData() {
    getCSV()
  }

  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-2xl font-bold">Cargando...</h1>
    </div>
  }

  if (data) {
    const infoData: TPaginationData = data.data
    const { comerciantes, totalPages } = infoData

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
      <div>

        <div className="flex gap-x-5">
          <Link className="bg-rose-600 flex justify-center items-center w-[200px] text-white h-10 my-3 rounded-lg cursor-pointer font-bold border-2" href={'/home/create'}>Crear Formulario Nuevo</Link>
          {userActive.data.rol === 'ADMIN' && (
            <button onClick={generateCSVData} type="button" className="bg-white flex justify-center items-center w-[200px] h-10 my-3 rounded-lg cursor-pointer font-bold border-2 border-rose-600 text-rose-600">Descargar Reporte CSV</button>

          )}
        </div>
        <table className=" border rounded-xl">
          <thead className="bg-blue-400 h-10">
            <tr className="text-white">
              <th className='w-[160px] border border-gray-500'>Nombre</th>
              <th className='w-[160px] border border-gray-500'>Teléfono</th>
              <th className='w-[160px] border border-gray-500'>Correo Electrónico</th>
              <th className='w-[160px] border border-gray-500'>Fecha Registro</th>
              <th className='w-[160px] border border-gray-500'>No. Establecimientos</th>
              <th className='w-[160px] border border-gray-500'>Estado</th>
              <th className='w-[160px] border border-gray-500'>Acciones</th>
            </tr>
          </thead>
          <tbody>

            {comerciantes.map((businessman) => (
              <Row key={businessman.id} {...businessman} />
            ))}

          </tbody>
        </table>
        <div className="flex gap-x-5 my-5">
          <div className="flex">
            <label htmlFor="items" className="text-gray-500 mr-2">Items:</label>
            <select onChange={handleChangeItems} id="items" className=" border border-gray-400 rounded-md" defaultValue={take}>
              <option value="5"> 5 </option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>

          </div>
          <p className="flex justify-center">

            {page > 1 && (
              <Link className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" href={`/home?page=${page - 1}`} >&laquo;</Link>

            )}

            {pages.map(currentPage => (
              <Link className={`  ${page === currentPage && 'bg-blue-300 font-black'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`} key={currentPage} href={`/home?page=${currentPage}`}> {currentPage} </Link>
            ))}

            {page < totalPages && (
              <Link className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" href={`/home?page=${page + 1}`} >&raquo;</Link>
            )}
          </p>
        </div>

      </div>
    )

  }
}
