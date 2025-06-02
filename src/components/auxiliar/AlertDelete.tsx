"use client"


export default function AlertDelete() {
  return (
    <div className="z-20 fixed alertBackground w-full h-screen flex justify-center items-center">
      <div className="w-[400px] h-[200px] bg-white flex flex-col justify-evenly items-center rounded-lg">
        <h2 className="font-bold">¿Está seguro de eliminar al comerciante?</h2>
        <p className="text-center">Tambien se eliminarán los establecimientos que eran propiedad del comerciante</p>
        <button className=" bg-red-700 text-white rounded-lg py-2 px-7 cursor-pointer">Eliminar</button>
      </div>
    </div>
  )
}
