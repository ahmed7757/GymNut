import { NavLink } from "react-router-dom"
import { RiTeamLine } from "react-icons/ri";

const Footer = () => {
    return (
        <footer className="footer footer-center p-5 dark:bg-[#0a3126] text-[#fefefe] bg-[#007654]">
            <aside>
                <h2 className="text-5xl font-bold ">GYMNUT</h2>
                <nav className="flex items-center gap-1">
                    <RiTeamLine className="text-xl" />
                    <NavLink to={"/team"} className="text-xl">Meet our team</NavLink>
                </nav>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
        </footer>
    )
}

export default Footer