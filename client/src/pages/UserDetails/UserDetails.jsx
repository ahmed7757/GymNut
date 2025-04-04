import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { UserContext } from "../../contexts/User";
import PropTypes from "prop-types";
import validator from "validator";

const updateProfileURL = "/user/updateProfile";
// const PhoneRegex = /^(01)[0-9]{9}$/
const phoneNumberRegex = /^01\d{0,9}$/;

const UserDetails = ({ onNext, phoneNumber, setPhoneNumber, profilePicture, setProfilePicture }) => {
    console.log()
    // console.log(phoneNumber, profilePicture === "")

    return (
        <div className="flex flex-col space-y-5 items-center pb-10">
            <div className="flex flex-col items-center gap-8">
                <h2 className="text-3xl font-semibold text-green-700">Enter your phone number</h2>
                <div role="alert" className={`${validator.isMobilePhone(phoneNumber, "ar-EG") || phoneNumber.length === 0 ? "hidden" : ""} alert alert-error w-80`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error! Incorrect Phone Number</span>
                </div>
                <input
                    value={phoneNumber}
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${validator.isMobilePhone(phoneNumber, "ar-EG") || phoneNumber.length === 0 ? "border-green-800" : "border-red-700"} placeholder:text-black dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] shadow-lg rounded-lg border-2 bg-green-400 p-2 border-black w-52 h-14`}
                    placeholder="phone number"
                />
            </div>
            <div className="flex flex-col items-center gap-8">
                <h2 className="text-3xl dark:text-current font-semibold text-green-700">Insert your Profile Picture</h2>
                <div role="alert" className={`${profilePicture ? "hidden" : ""} alert alert-error w-80`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Insert Profile Picture</span>
                </div>
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files.length > 0) {
                            setProfilePicture(e.target.files[0]); // set the file object itself
                        }
                    }}
                    className={` file-input file-input-bordered dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] file-input-success w-full max-w-xs border-2 border-black`}
                />
            </div>
            <button
                className={`${validator.isMobilePhone(phoneNumber, "ar-EG") && profilePicture ? "hover:translate-x-2" : ""} absolute right-8 bottom-10 transition text-4xl text-[#007654]`}
                onClick={() => { onNext() }}
                disabled={!validator.isMobilePhone(phoneNumber, "ar-EG") || profilePicture === ""}
            >
                <FaArrowAltCircleRight />
            </button>
        </div>
    )
}

UserDetails.propTypes = {
    onNext: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    setPhoneNumber: PropTypes.func.isRequired,
    profilePicture: PropTypes.string.isRequired,
    setProfilePicture: PropTypes.func.isRequired,
}

const UserDetails2 = ({ onNext, onPrev, age, setAge }) => {
    return (
        <div className="flex flex-col space-y-5 items-center pb-10">
            <h2 className="text-3xl font-semibold dark:text-current text-green-700">What is your age?</h2>
            <input
                type="number"
                onChange={(e) => {
                    // console.log(e.target.value);
                    // console.log(e.target.min);
                    // console.log(e.target.max);  
                    if (parseInt(e.target.value) > parseInt(e.target.max) || parseInt(e.target.value) < parseInt(e.target.min)) {
                        console.log("Please enter a valid age");
                        e.target.value = e.target.min;
                    }
                    // if(!isNaN(parseInt(e.target.value))){
                    //     setAge(parseInt(e.target.value));
                    // }
                    setAge(e.target.value);
                }}
                value={age}
                id="age"
                name="age"
                className="placeholder:text-green-950 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] shadow-lg rounded-lg border-2 bg-green-400 p-2 border-black w-52 h-14"
                placeholder="Enter your Age"
                max={150}

            />
            <button
                className="absolute right-8 bottom-10 transition hover:translate-x-2 text-4xl text-[#007654]"
                onClick={() => {
                    if (isNaN(age)) {
                        // alert("Please enter a valid age");
                    } else {
                        onNext();
                    }
                }
                }
            >
                <FaArrowAltCircleRight />
            </button>
            <button
                className="absolute left-8 bottom-10 transition hover:-translate-x-2 text-4xl text-[#007654]"
                onClick={() => { onPrev(1) }}
            >
                <FaArrowAltCircleLeft />
            </button>
        </div>
    );
};

UserDetails2.propTypes = {
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    age: PropTypes.string.isRequired,
    setAge: PropTypes.func.isRequired,
};

const UserDetails3 = ({ onNext, onPrev, height, setHeight, weight, setWeight }) => {
    return (
        <div className="flex flex-col space-y-8 justify-center items-center pb-10">
            <h2 className="text-2xl font-semibold dark:text-current text-green-900">What is your height and weight?</h2>
            <div className="space-y-5 text-left h-24 w-full">
                <div className="flex gap-5 text-left">
                    <label className="font-medium dark:text-current text-2xl w-20 text-green-900 text-left">Height</label>
                    <input
                        type="number"
                        required
                        placeholder="Enter your Height"
                        min={0}
                        max={300}
                        id="Height"
                        name="Height"
                        onChange={(e) => {
                            if (parseInt(e.target.value) > parseInt(e.target.max) || parseInt(e.target.value) < parseInt(e.target.min)) {
                                console.log("Please enter a valid height");
                                e.target.value = e.target.min;
                            }
                            // if(!isNaN(parseInt(e.target.value))){
                            //     setHeight(parseInt(e.target.value));
                            // }
                            setHeight(e.target.value);
                            // e.target.focus();
                        }}
                        value={height}
                        className="placeholder:text-green-950 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-52 h-10 transition-all duration-500 ease-in-out"
                    />
                </div>
                <div className="flex gap-5 text-left">
                    <label className="font-medium dark:text-current text-2xl w-20 text-green-900">Weight</label>
                    <input
                        type="number"
                        required
                        placeholder="Enter your Weight"
                        min={0}
                        max={500}
                        id="Weight"
                        name="Weight"
                        onChange={(e) => {
                            if (parseInt(e.target.value) > parseInt(e.target.max) || parseInt(e.target.value) < parseInt(e.target.min)) {
                                console.log("Please enter a valid weight");
                                e.target.value = e.target.min;
                            }
                            // if(!isNaN(parseInt(e.target.value))){
                            //     setWeight(parseInt(e.target.value));
                            // }
                            setWeight(e.target.value);
                        }}
                        value={weight}
                        className="placeholder:text-green-950 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-52 h-10 transition-all ease-in-out duration-500 "
                    />
                </div>
            </div>
            <button
                className="absolute right-8 bottom-10 transition hover:translate-x-2 text-4xl text-[#007654]"
                onClick={onNext}
            >
                <FaArrowAltCircleRight />
            </button>
            <button
                className="absolute left-8 bottom-10 transition hover:-translate-x-2 text-4xl text-[#007654]"
                onClick={onPrev}
            >
                <FaArrowAltCircleLeft />
            </button>
        </div>
    );
};

UserDetails3.propTypes = {
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    height: PropTypes.string.isRequired,
    setHeight: PropTypes.func.isRequired,
    weight: PropTypes.string.isRequired,
    setWeight: PropTypes.func.isRequired,
};


const UserDetails4 = ({ onPrev, disease, setDisease, specifiedDisease, setSpecifiedDisease, specifiedDiseaseActive, setSpecifiedDiseaseActive }) => {
    const diseaseHandler = (e) => {
        if (e.target.value === "other") {
            // setDisease(specifiedDisease);
            setSpecifiedDiseaseActive(true);
            console.log(disease)
        } else {
            setDisease(e.target.value);
            setSpecifiedDiseaseActive(false);
        }
    };

    return (
        <div className="flex flex-col space-y-8 justify-center items-center pb-10">
            <label htmlFor="healthCondition" className="w-96 dark:text-current text-2xl  font-semibold text-green-900">
                Do you have any existing medical conditions or dietary restrictions that we should be aware of?
            </label>
            <select
                onChange={diseaseHandler}
                value={disease}
                id="healthCondition"
                name="healthCondition"
                className="bg-green-400 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] text-green-950 rounded-md shadow-md font-serif p-2"
                required
                placeholder="Select a Condition"
            >
                <option value="none">None</option>
                <option value="diabetes">Diabetes</option>
                <option value="hypertension">Hypertension</option>
                <option value="allergies">Allergies</option>
                <option value="Lactose Intolerance">Lactose Intolerance</option>
                <option value="other">Other (Please specify)</option>
            </select>
            <input
                type="text"
                onChange={(e) => setSpecifiedDisease(e.target.value)}
                value={specifiedDisease}
                id="otherCondition"
                name="otherCondition"
                placeholder="Specify if other"
                style={specifiedDiseaseActive ? {} : { display: "none" }}
                className="placeholder:text-green-950 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] shadow-md rounded-lg border-2 bg-green-400 p-2 hover:border-black w-52 h-10 transition-all ease-in-out duration-1000"
            />
            <input
                type="submit"
                className="absolute dark:bg-success dark:shadow-sm right-8 bottom-10 transition-all ease-in-out shadow-lg rounded-lg bg-green-400 text-green-950 text-xl shadow-green-700 p-1"
            />
            <button
                className="absolute left-8 bottom-10 transition hover:-translate-x-2 text-4xl text-[#007654]"
                onClick={onPrev}
            >
                <FaArrowAltCircleLeft />
            </button>
        </div>
    );
};

UserDetails4.propTypes = {
    onPrev: PropTypes.func.isRequired,
    disease: PropTypes.string.isRequired,
    setDisease: PropTypes.func.isRequired,
    specifiedDisease: PropTypes.string.isRequired,
    setSpecifiedDisease: PropTypes.func.isRequired,
    specifiedDiseaseActive: PropTypes.bool.isRequired,
    setSpecifiedDiseaseActive: PropTypes.func.isRequired,
};

const Card = () => {
    const loggedData = useContext(UserContext);

    const [step, setStep] = useState(1);
    const [age, setAge] = useState("");
    const [height, setHeight] = useState(""); // Declare height here
    const [weight, setWeight] = useState(""); // Declare weight here
    const [disease, setDisease] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [specifiedDisease, setSpecifiedDisease] = useState("");
    const [specifiedDiseaseActive, setSpecifiedDiseaseActive] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(age, height, weight, disease);
        console.log(loggedData.loggedUser)
        if (isNaN(parseInt(age)) || isNaN(parseInt(height)) || isNaN(parseInt(weight))) {
            alert("Please enter valid values");
        } else {
            try {
                const updatedData = new FormData();
                updatedData.append('age', age);
                updatedData.append('height', height);
                updatedData.append('weight', weight);
                updatedData.append('disease', specifiedDisease || disease);
                updatedData.append('phoneNum', phoneNumber);
                updatedData.append('profilePicture', profilePicture);

                await axios.patch(
                    updateProfileURL,
                    updatedData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${loggedData.loggedUser}`,
                        },
                        withCredentials: false,
                    }
                );

                navigate("/HomePage");
            } catch (err) {
                console.error(err);
            }
        }
    };

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

    return (
        <section className="container relative h-screen px-14 flex justify-center items-center">
            <label className="swap swap-rotate absolute right-6 top-6">
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
            <div className="bg-white dark:bg-[#1A1A1A] dark:shadow-[#1e1e2d] shadow-xl shadow-green-700 rounded-xl relative p-14 transition-all">
                <form onSubmit={handleSubmit}>

                    {step === 1 ? (
                        <UserDetails onNext={() => setStep(2)}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            profilePicture={profilePicture}
                            setProfilePicture={setProfilePicture}
                        />
                    ) : step === 2 ? (
                        <UserDetails2 onNext={() => setStep(3)} age={age} setAge={setAge} onPrev={setStep} />
                    ) : step === 3 ? (
                        <UserDetails3
                            onNext={() => setStep(4)}
                            onPrev={() => setStep(2)}
                            height={height}
                            setHeight={setHeight}
                            weight={weight}
                            setWeight={setWeight}
                        />
                    ) : (
                        <UserDetails4
                            onPrev={() => setStep(3)}
                            disease={disease}
                            setDisease={setDisease}
                            specifiedDisease={specifiedDisease}
                            setSpecifiedDisease={setSpecifiedDisease}
                            specifiedDiseaseActive={specifiedDiseaseActive}
                            setSpecifiedDiseaseActive={setSpecifiedDiseaseActive}
                        />
                    )}
                </form>
            </div>
        </section>
    );
};

export default Card;