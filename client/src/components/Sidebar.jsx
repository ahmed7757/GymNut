import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../contexts/User"
import { CiEdit } from "react-icons/ci";


const getProfileUrl = "/user/profile"

const Sidebar = ({ setShowHide, setData, data, setUsernameDisplay, usernameDisplay, pictureDisplay, setPictureDisplay }) => {

    const loggedData = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token")
        loggedData.setLoggedUser(null);
        navigate("/login")
    }

    const toggleUser = () => {
        setUsernameDisplay(prev => !prev)
        setShowHide(true)
    }
    // console.log(usernameDisplay)
    // console.log(typeof data.profilePicture)
    // console.log(typeof data.profilePicture !== "object")

    return (
        <>
            <div className="flex flex-col gap-6 items-center text-xl font-semibold">
                <div className="avatar placeholder flex flex-col items-center gap-4">
                    {typeof data.profilePicture !== "object" && data.profilePicture?.split("/").at(-1)
                        ?
                        (<div className="w-24 relative rounded-full border-2 border-white ">
                            <img className=" rounded-full" src={data.profilePicture} alt={`${data.username} Profile Picture`} />
                            <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-gray-500 opacity-0 duration-300 transition-opacity hover:opacity-75 w-full h-full ">
                                <CiEdit className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl" />
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            profilePicture: e.target.files[0],
                                        }))
                                        setShowHide(true)
                                    }}
                                    className={` absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 file-input file-input-bordered file-input-success w-full max-w-xs`}
                                />
                            </div>
                        </div>)
                        :
                        (<div className="w-24 relative rounded-full border-2 border-white ">
                            <div className="bg-neutral text-neutral-content w-full h-full items-center justify-center flex">
                                <span className="text-3xl">{data.username?.at(0).toUpperCase()}</span>
                            </div>
                            <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-gray-500 opacity-0 duration-300 transition-opacity hover:opacity-75 w-full h-full ">
                                <CiEdit className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl" />
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            profilePicture: e.target.files[0],
                                        }))
                                        setShowHide(true)
                                    }}
                                    className={` absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 file-input file-input-bordered file-input-success w-full max-w-xs`}
                                />
                            </div>
                        </div>)
                    }
                    {/* <input
                        type="file"
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                profilePicture: e.target.files[0],
                            }))
                            setShowHide(true)
                        }}
                        className={`${pictureDisplay ? "block" : "hidden"} file-input file-input-bordered file-input-success w-full max-w-xs`}

                    />
                    <div
                        onClick={toggleuser2} // Toggle input when button is clicked
                        className="p-1 hover:text-white shadow-md rounded-lg transition-all cursor-pointer"
                    >
                        <CiEdit />
                    </div> */}
                </div>
                <div className="flex gap-3">
                    <h2 className={`${usernameDisplay ? "hidden" : "block"} font-bold`}>{data.username}</h2>
                    <input
                        // value={data.username}
                        type="text"
                        onChange={(e) => {
                            setData((prev) => ({ ...prev, userName: e.target.value })); // Update the state with input value
                        }}
                        className={`${usernameDisplay ? "block" : "hidden"} rounded-lg w-48 p-2 hover:border-2 hover:border-black transition-all ease-in-out dark:text-[#a6adbb]`}
                    />
                    <div
                        onClick={toggleUser} // Toggle input when button is clicked
                        className="p-1 hover:text-white shadow-md rounded-lg transition-all cursor-pointer"
                    >
                        <CiEdit />
                    </div>
                </div>
                <hr className="border-2 min-w-32 max-w-full mx-9 border-black my-2" />
            </div>
            <div className="flex flex-col h-full justify-end">
                {/* <div className="flex flex-col space-y-2">
                    <Link className="text-xl hover:text-white transition-all duration-200 ease-in-out hover:shadow-md rounded-lg self-center p-2" to={"/Myprofile"}>Information</Link>
                    <Link className="text-xl hover:text-white transition-all duration-200 ease-in-out hover:shadow-md rounded-lg self-center p-2" to={"/Myprofile/MyPlans"}>My Plans</Link>
                </div> */}
                <button onClick={logout} className="font-semibold linkstyle text-xl hover:text-white transition-all duration-200 ease-in-out hover:shadow-md rounded-lg self-center p-2">LOGOUT</button>
            </div>
        </>


    )
}

export default Sidebar

