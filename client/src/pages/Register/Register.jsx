import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";
import axios from "../../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const EMIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const REGISTER_URL = "/auth/register";

const Register = () => {
    const loggedInData = useContext(UserContext);
    const userRef = useRef();
    const navigate = useNavigate();

    const [genderValue, setGenderValue] = useState("Male");

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [userEmil, setUserEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const onUserChange = (e) => {
        setUser(e.target.value);
        setValidName(USER_REGEX.test(e.target.value));
    };

    const onEmailChange = (e) => {
        setUserEmail(e.target.value);
        setValidEmail(validator.isEmail(e.target.value));
    };

    const onPwdChange = (e) => {
        setPwd(e.target.value);
        setValidPwd(validator.isStrongPassword(e.target.value));
    };

    const onMatchChange = (e) => {
        setMatchPwd(e.target.value);
        setValidMatch(pwd === e.target.value);
    };

    useEffect(() => {
        setErrMsg("");
    }, [user, userEmil, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validName || !validEmail || !validPwd) {
            setErrMsg("Invalid Entry");
            return;
        }
        // ### send data to server ###
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({
                    userName: user,
                    email: userEmil,
                    password: pwd,
                    gender: genderValue,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: false,
                }
            );
            sessionStorage.setItem("token", response.data.token);
            // console.log(response.authenticateToken);
            // console.log(JSON.stringify(response));
            // buttonRef.current.click();
            loggedInData.setLoggedUser(response.data.token);
            navigate("/UserDetails");
        } catch (err) {
            console.clear();
            // console.log(err);
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                const errResponseText = JSON.parse(
                    err.response?.request?.response
                ).message;
                setErrMsg(errResponseText);
                // setErrMsg('Email Already Registered')
            } else {
                setErrMsg("Registration Failed");
            }
        }
    };

    return (
        <section className="flex flex-col items-center justify-center h-full">
            <div className="bg-[#fefefe] dark:bg-[#1A1A1A] dark:shadow-[#1e1e2d] rounded-lg shadow-lg shadow-[#007654] space-y-6 px-8 py-6 max-w-md w-3/4">
                <h1 className="text-4xl dark:text-current font-extrabold text-center mb-4 text-[#9fb429]">
                    Register
                </h1>
                <div
                    className={
                        errMsg
                            ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
                            : "hidden"
                    }
                    role="alert"
                >
                    <span className="block sm:inline">{errMsg}</span>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-3 items-left"
                >
                    <div className="relative space-y-1">
                        <label htmlFor="username" className="absolute top-4 right-2 z-10">
                            <FaCheck
                                className={validName ? "visible text-green-500" : "hidden"}
                            />
                            <FaTimes
                                className={
                                    validName || !user ? "hidden" : "visible text-red-600"
                                }
                            />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={onUserChange}
                            value={user}
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className="relative shadow-sm dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]"
                            placeholder="username"
                            required
                        />
                        <p
                            id="uidnote"
                            className={
                                userFocus && user && !validName
                                    ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                    : "hidden"
                            }
                        >
                            <FaInfoCircle />
                            4 to 24 characters.
                            <br />
                            Must begin with a letter.
                            <br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>
                    <div className="relative space-y-1">
                        <label htmlFor="email" className="absolute top-4 right-2 z-10">
                            <FaCheck
                                className={validEmail ? "visible text-green-500" : "hidden"}
                            />
                            <FaTimes
                                className={
                                    validEmail || !userEmil ? "hidden" : "visible text-red-600"
                                }
                            />
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={onEmailChange}
                            value={userEmil}
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uemailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            className="shadow-sm rounded-md dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]"
                            placeholder="Example@domain.com"
                            required
                        />
                        <p
                            id="uidnote"
                            className={
                                emailFocus && userEmil && !validEmail
                                    ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                    : "hidden"
                            }
                        >
                            <FaInfoCircle />
                            use this form &apos;your@domain-name.domain&apos;.
                            <br />
                            Can include letters, numbers, underscores (_), hyphens (-), and
                            dots (.) before the @ symbol.
                        </p>
                    </div>
                    <div className=" relative space-y-1">
                        <label htmlFor="password" className="absolute top-4 right-2 z-10">
                            <FaCheck
                                className={validPwd ? "visible text-green-500" : "hidden"}
                            />
                            <FaTimes
                                className={validPwd || !pwd ? "hidden" : "visible text-red-600"}
                            />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={onPwdChange}
                            value={pwd}
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                            className="shadow-sm mb-2 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]"
                            placeholder="password"
                            required
                        />
                        <p
                            id="pwdnote"
                            className={
                                pwdFocus && pwd && !validPwd
                                    ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                    : "hidden"
                            }
                        >
                            <FaInfoCircle />
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a number and a
                            special character.
                            <br />
                            Allowed special characters:{" "}
                            <span aria-label="exclamation mark">!</span>{" "}
                            <span aria-label="at symbol">@</span>{" "}
                            <span aria-label="hashtag">#</span>{" "}
                            <span aria-label="dollar sign">$</span>{" "}
                            <span aria-label="percent">%</span>
                        </p>
                    </div>
                    <div className=" relative space-y-1">
                        <label
                            htmlFor="confirm_pwd"
                            className="absolute top-4 right-2 z-10"
                        >
                            <FaCheck
                                className={
                                    validMatch && matchPwd ? "visible text-green-500" : "hidden"
                                }
                            />
                            <FaTimes
                                className={
                                    validMatch || !matchPwd ? "hidden" : "visible text-red-600"
                                }
                            />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={onMatchChange}
                            value={matchPwd}
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            className="shadow-sm mb-2 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]"
                            placeholder="Confirm password"
                            required
                        />
                        <p
                            id="confirmnote"
                            className={
                                matchFocus && !validMatch
                                    ? "visible text-xs items-start flex gap-1 bg-neutral-800 text-white rounded-md p-1"
                                    : "hidden"
                            }
                        >
                            <FaInfoCircle />
                            Must match the first password input field.
                        </p>
                    </div>
                    <div className="felx space-x-2 items-center">
                        <label htmlFor="gender">Gender</label>
                        <select
                            value={genderValue}
                            onChange={(e) => setGenderValue(e.target.value)}
                            name="gender"
                            id="gender"
                            className="border-2 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] border-[#9fb429] focus:border-[#007654] rounded-md"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={
                            !validEmail || !validMatch || !validName || !validPwd
                                ? true
                                : false
                        }
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#105642] bg-[#007654] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] transition-all cursor-pointer disabled:bg-opacity-50"
                    >
                        Sign Up
                    </button>
                    <div className="flex items-center justify-center mt-4 gap-1">
                        <Link
                            to={"/login"}
                            className="text-xs text-[#bdd367]  hover:text-[#9fb429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654]"
                        >
                            Have an account?
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;
