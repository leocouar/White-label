import menuDashboard from "@/components/dashboard/MenuDashboard.js"

function dashboard() {

    return (
        <div>
            <div class="p-2 bg-black-500 w-60 flex flex-col hidden md:flex" id="sideNav">
                <nav>
                    <a class="block text-black-500 py-2.5 px-4 my-4 rounded transition hover:py-3.5 duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-gray" href="#">
                        <i class="fas fa-file-alt mr-2"></i>Comercio
                    </a>

                    <a class="block text-black-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-gray" href="#">
                        <i class="fas fa-home mr-2"></i>Productos
                    </a>
                    <a class="block text-black-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-gray" href="#">
                        <i class="fas fa-home mr-2"></i>Volver
                    </a>
                </nav>

                <a class="block text-black-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-cyan-300 hover:text-gray mt-auto" href="#">
                    <i class="fas fa-sign-out-alt mr-2"></i>Cerrar sesión
                </a>
                <div class="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
            </div>
        </div>
    )
}
export default dashboard