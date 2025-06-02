import Title from "@/components/auxiliar/Title";
import TableBusinessman from "@/components/table/TableBusinessman";


export default function HomePage() {






    return (
        <div className='w-full h-screen flex flex-col bg-white' >

            <Title text='Lista Formularios Creados' />
            <div className='w-full flex flex-col items-center'>
                <TableBusinessman/>
            </div>
        </div>
    )

}
