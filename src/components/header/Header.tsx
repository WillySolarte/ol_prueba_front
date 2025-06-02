import Image from "next/image"
export default function Header() {
    return (
        <header className='flex justify-between p-5 items-center bg-white'>
            <Image
                className="dark:invert"
                src="/logo.png"
                alt="Next.js logo"
                width={180}
                height={38}
                priority
            />
            <p className='font-bold'>Beneficios por renovar</p>
        </header>
    )
}
