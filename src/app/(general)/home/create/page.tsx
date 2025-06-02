import Title from "@/components/auxiliar/Title";
import CreateForm from "@/components/create/CreateForm";

export default function CreatePage() {
  return (
    <div className='w-full h-screen flex flex-col bg-blue-100' >

      <Title text={"Crear Comerciante"} />
      <div className='w-full flex flex-col items-center'>
        <CreateForm/>
      </div>

    </div>
  )
}
