import { Outlet } from "react-router-dom"
import "./Layout.css"

const Layout2 = () => {
    return (
        <div className="overflow-x-hidden flex flex-col justify-between h-screen ">
            <div className="fixed top-0 dark:hidden -z-10 h-full w-full bg-[#ebddc3]"></div>
            <div className="absolute top-0 hidden dark:block z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <main className="container mx-auto h-full">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout2;