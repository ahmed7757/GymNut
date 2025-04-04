import { NavLink, Link, useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import axios from "../api/axios";

const getProfileUrl = "/user/profile";

const NavLinks = () => {
    return (
        <>
            {/* <NavLink to={"/"} className="font-semibold link">HOME</NavLink> */}
            <NavLink to={"/"} className="font-semibold linkStyle">HOME</NavLink>
            <a className="font-semibold linkStyle" href="#About">ABOUT</a>
            <a className="font-semibold linkStyle" href="#Services">SERVICES</a>
            <a className="font-semibold linkStyle" href="#Contact">CONTACT</a>
            <NavLink className="font-semibold linkStyle" to={"/login"}>LOGIN</NavLink>
        </>
    );
}

const NavLinks2 = () => {
    return (
        <>
            <NavLink to={"/HomePage"} className="font-semibold linkStyle">HOME</NavLink>
            <NavLink to={"/Track"} className="font-semibold linkStyle">TRACK</NavLink>
            <NavLink to={"/plan"} className="font-semibold linkStyle">PLANS</NavLink>
        </>
    );
}


const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
    const loggedData = useContext(UserContext)
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (loggedData.loggedUser) {
                try {
                    const response = await axios.get(getProfileUrl);
                    setData(response.data.user);
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    if (err.response?.status === 403) {
                        loggedData.setLoggedUser(null);
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        navigate('/login');
                    }
                }
            }
        };
        fetchData();
    }, [loggedData.loggedUser, navigate]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme])

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    }
    // console.log(data.age)
    // console.log(typeof data.age)
    // console.log(data?.age !== 0 , data?.height !== 0 , data?.weight !== 0 , data?.disease , data?.phoneNum , data?.profilePicture) 
    // console.log(data?.age !== 0 && data?.height !== 0 && data?.weight !== 0 && data?.disease && data?.phoneNum && data?.profilePicture)
    return (
        <header className=" px-2 sm:px-8 md:px-12 lg:px-14 top-0 z-[2000] sticky mx-auto flex-wrap w-full flex py-4 items-center justify-between dark:bg-[#0a3126] text-[#fefefe] bg-[#007654]">
            <Link to={loggedData.loggedUser ? "/homePage" : "/"} className="text-3xl font-bold">GYMNUT</Link>
            <nav className=" justify-end items-center gap-4 flex">
                <div className="hidden md:gap-6 md:flex justify-between w-full">
                    {loggedData.loggedUser ?
                        <NavLinks2 />
                        :
                        <NavLinks />}
                </div>
                {
                    loggedData.loggedUser && (

                        <NavLink to={"/Myprofile"} className="font-semibold">
                            <div className="avatar placeholder indicator">
                                {data.profilePicture?.split("/").at(-1) ? (<div className=" w-12 rounded-full border-2 border-white">
                                    <span className={`${data?.age !== 0 && data?.height !== 0 && data?.weight !== 0 && data?.disease && data?.phoneNum && data?.profilePicture ? "hidden" : ""} indicator-item badge badge-error top-1 right-1`}></span>
                                    <img className=" rounded-full" src={data.profilePicture} alt={`${data.userName} Profile Picture`} />
                                </div>)
                                    :
                                    (<div className="bg-neutral text-neutral-content w-12 border-2 border-white rounded-full">
                                        <span className="text-3xl">{data.userName?.at(0).toUpperCase()}</span>
                                    </div>)
                                }
                            </div>
                        </NavLink>
                    )}
                <div className="dropdown">
                    <GiHamburgerMenu tabIndex={0} role="button" className="text-3xl cursor-pointer md:hidden"
                    />
                    <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        {loggedData.loggedUser ?
                            <NavLinks2 />
                            :
                            <NavLinks />}
                    </div>
                </div>
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input onChange={handleToggle} checked={theme === "dark" ? false : true} type="checkbox" className="theme-controller" value="synthwave" />

                    {/* sun icon */}
                    <svg
                        className="swap-off h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className="swap-on h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
            </nav>
        </header>
    )
}

export default Header