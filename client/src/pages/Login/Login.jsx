import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { useState, useRef, useEffect, useContext } from "react";
import { VscEye } from "react-icons/vsc";
import { TbEyeClosed } from "react-icons/tb";
import axios from "../../api/axios";
import { UserContext } from "../../contexts/User";

const USER_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;
const REGISTER_URL = "/auth/login";

const Login = () => {
  const loggedInData = useContext(UserContext);
  const userRef = useRef();
  const navigate = useNavigate();
  // const buttonRef = useRef();

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [pwdInputType, setPwdInputType] = useState("password");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const onUserChange = (e) => {
    setUser(e.target.value);
    setValidUser(
      USER_REGEX.test(e.target.value) || validator.isEmail(e.target.value)
    );
  };

  const onPwdChange = (e) => {
    setPwd(e.target.value);
    setValidPwd(validator.isStrongPassword(e.target.value));
  };

  const onEyeClick = () => {
    setShowPwd(!showPwd);
    setPwdInputType(showPwd ? "password" : "text");
  };

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validUser) {
      setErrMsg("Invalid Email or Username");
      return;
    } else if (!validPwd) {
      setErrMsg("Invalid Password");
      return;
    }
    // ### send data to server ###
    // const originalConsoleError = console.error;
    console.error = () => { };
    try {
      const uname = validator.isEmail(user) ? "" : user;
      const uemail = !validator.isEmail(user) ? "" : user;
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          userName: uname,
          email: uemail,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      const data = response.data.token;
      if (data !== undefined) {
        if (stayLoggedIn) {
          localStorage.setItem("token", data);
        } else {
          sessionStorage.setItem("token", data);
        }
        loggedInData.setLoggedUser(data);
        navigate("/HomePage");
      }
    } catch (err) {
      console.clear()
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        const errResponseCode = JSON.parse(
          err.response?.request?.response
        ).code;
        if (errResponseCode === 4000 && validator.isEmail(user)) {
          setErrMsg("Email not found");
        } else if (errResponseCode === 4000 && !validator.isEmail(user)) {
          setErrMsg("Username not found");
        } else if (errResponseCode === 4001) {
          setErrMsg("incorrect password");
        }
        // setErrMsg('Email Already Registered')
      } else {
        setErrMsg("Registration Failed");
      }
    }
    // console.error = originalConsoleError;
  };

  return (
    <section className="flex items-center justify-center h-full ">
      <div className="bg-[#fefefe] dark:bg-[#1A1A1A] dark:shadow-[#1e1e2d] rounded-lg shadow-lg shadow-[#007654] space-y-6 px-8 py-6 max-w-md w-3/4">
        <h1 className="text-3xl dark:text-current font-bold text-center mb-4 text-[#95a926]">
          Welcome Back!
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
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="on"
              onChange={onUserChange}
              value={user}
              aria-invalid={validUser ? "false" : "true"}
              className="relative shadow-sm dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]"
              placeholder="username"
              required
            />
          </div>
          <div className=" relative space-y-1 select-none">
            <span
              onClick={onEyeClick}
              htmlFor="password"
              className={
                pwd ? "absolute top-3 right-2 z-10 cursor-pointer" : "hidden"
              }
            >
              <TbEyeClosed
                className={showPwd ? "visible size-6 mt-1 mr-1" : "hidden"}
              />
              <VscEye className={showPwd ? "hidden" : "visible size-7 "} />
            </span>
            <input
              type={pwdInputType}
              id="password"
              onChange={onPwdChange}
              value={pwd}
              aria-invalid={validPwd ? "false" : "true"}
              className="shadow-sm mb-2 dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7] "
              placeholder="password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#bdd367] focus:ring-[#007654]focus:outline-none"
                onChange={() => setStayLoggedIn(!stayLoggedIn)}
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-[#9fb429] "
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-xs text-right text-[#bdd367] hover:text-[#9fb429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] "
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={user && pwd ? false : true}
            className={
              (user && pwd ? "" : "cursor-default") +
              " w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#105642] bg-[#007654] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] transition-all cursor-pointer disabled:bg-opacity-50"
            }
          >
            Log In
          </button>
          <div className="flex items-center justify-center gap-1">
            <h6 className="text-sm ">Don&apos;t have account? </h6>
            <Link
              to={"/register"}
              className="text-xs text-[#bdd367]  hover:text-[#9fb429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654]"
            >
              {" "}
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
