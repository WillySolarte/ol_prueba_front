import Title from "@/components/auxiliar/Title";
import CreateForm from "@/components/create/CreateForm";
import Link from "next/link";

export default function CreatePage() {
  return (
    <div className='w-full h-screen flex flex-col bg-blue-100' >

      <Title text={"Crear Comerciante"} />
      <Link href={'/home'} className="bg-green-700 w-32 text-white rounded-md flex justify-center items-center h-10 mx-7" >Regresar</Link>
      <div className='w-full flex flex-col items-center'>
        <CreateForm/>
      </div>

    </div>
  )
}
