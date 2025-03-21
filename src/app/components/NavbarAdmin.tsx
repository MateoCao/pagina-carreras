import Link from "next/link"

export const NavbarAdmin = () => {
    return (
        <nav className="w-full text-lg flex justify-center p-4">
            <ul className="flex gap-5 ">
                <li className="cursor-pointer border-b-2 border-transparent hover:border-gray-400 focus:border-blue-500 transition-colors">
                    <Link href="/admin/crear-seccion">Agregar sección</Link>
                </li>
                <li className="cursor-pointer border-b-2 border-transparent hover:border-gray-400 focus:border-blue-500 transition-colors">
                    <Link href="/admin/eliminar-seccion">Modificar sección</Link>
                </li>
                <li className="cursor-pointer border-b-2 border-transparent hover:border-gray-400 focus:border-blue-500 transition-colors">
                    <Link href="/admin/modificar-seccion">Eliminar sección</Link>
                </li>
            </ul>
        </nav>
    )
}