import { useState } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "../../api/axios";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setValidEmail(validator.isEmail(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validEmail) {
            setErrMsg("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setErrMsg("");

        try {
            console.log("Attempting to send password reset request...");
            console.log("Email:", email);
            console.log("Base URL:", axios.defaults.baseURL);

            // Try both endpoint formats
            let response;
            try {
                console.log("Trying /auth/forgot-password endpoint...");
                response = await axios.post(
                    "/auth/forgot-password",
                    { email },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        withCredentials: false,
                    }
                );
                console.log("Response from /auth/forgot-password:", response);
            } catch (err) {
                console.log("Error with /auth/forgot-password, trying /auth/forgotPassword...");
                response = await axios.post(
                    "/auth/forgotPassword",
                    { email },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        withCredentials: false,
                    }
                );
                console.log("Response from /auth/forgotPassword:", response);
            }

            console.log("Server response:", response);

            if (response.data.success) {
                setSuccess(true);
            } else {
                setErrMsg(response.data.message || "Failed to send reset email");
            }
        } catch (err) {
            console.error("Password reset error:", err);
            console.error("Error details:", {
                status: err.response?.status,
                data: err.response?.data,
                headers: err.response?.headers,
                config: err.config
            });

            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 404) {
                setErrMsg("Email not found");
            } else {
                setErrMsg(`Password reset request failed: ${err.response?.data?.message || err.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center h-full">
            <div className="bg-[#fefefe] dark:bg-[#1A1A1A] dark:shadow-[#1e1e2d] rounded-lg shadow-lg shadow-[#007654] space-y-6 px-8 py-6 max-w-md w-3/4">
                <h1 className="text-3xl dark:text-current font-bold text-center mb-4 text-[#95a926]">
                    Reset Your Password
                </h1>
                {success ? (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FaCheck className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">
                                    Password reset email sent!
                                </h3>
                                <p className="mt-2 text-sm text-green-700">
                                    Please check your email for the password reset link.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
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
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative space-y-1">
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    ref={(input) => input && input.focus()}
                                    onChange={onEmailChange}
                                    value={email}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    className="shadow-sm dark:bg-slate-400 dark:text-[#070F2B] placeholder:dark:text-[#070F2B] rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:shadow-sm focus:shadow-[#52c0a7]"
                                    placeholder="Email"
                                    required
                                />
                                <p
                                    id="emailnote"
                                    className={
                                        emailFocus && email && !validEmail
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    Please enter a valid email address.
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={!validEmail || isLoading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#007654] hover:bg-[#105642] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] disabled:opacity-50 transition-all"
                                >
                                    {isLoading ? "Sending..." : "Send Reset Link"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
                <div className="text-center">
                    <Link
                        to="/login"
                        className="text-sm text-[#bdd367] hover:text-[#9fb429] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654]"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword; 