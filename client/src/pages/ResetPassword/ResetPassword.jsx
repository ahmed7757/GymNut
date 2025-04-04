import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import validator from "validator";
import axios from "../../api/axios";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Get token from query parameter
        const params = new URLSearchParams(location.search);
        const tokenParam = params.get('token');

        if (tokenParam) {
            setToken(tokenParam);
            console.log("Token found in URL:", tokenParam);
        } else {
            console.error("No token found in URL");
            setErrMsg("Invalid or missing reset token. Please request a new password reset link.");
        }
    }, [location]);

    useEffect(() => {
        setErrMsg("");
    }, [newPassword, confirmPassword]);

    const onPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setValidPassword(validator.isStrongPassword(e.target.value));
        setValidMatch(e.target.value === confirmPassword);
    };

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setValidMatch(newPassword === e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setErrMsg("Invalid or missing reset token. Please request a new password reset link.");
            return;
        }

        if (!validPassword) {
            setErrMsg("Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters");
            return;
        }
        if (!validMatch) {
            setErrMsg("Passwords do not match");
            return;
        }

        setIsLoading(true);
        setErrMsg("");

        try {
            console.log("Submitting reset password request with token:", token);
            const response = await axios.post(
                "/auth/reset-password",
                JSON.stringify({
                    token,
                    newPassword,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: false,
                }
            );

            console.log("Reset password response:", response.data);

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setErrMsg(response.data.message || "Password reset failed");
            }
        } catch (err) {
            console.error("Error resetting password:", err);
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data.message || "Invalid request");
            } else if (err.response?.status === 404) {
                setErrMsg("Reset token not found or expired");
            } else {
                setErrMsg("Password Reset Failed: " + (err.response?.data?.message || "Unknown error"));
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
                                    Password reset successful!
                                </h3>
                                <p className="mt-2 text-sm text-green-700">
                                    You will be redirected to the login page shortly.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:z-10 sm:text-sm"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={onPasswordChange}
                                    onFocus={() => setPasswordFocus(true)}
                                    onBlur={() => setPasswordFocus(false)}
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                />
                                <p
                                    id="pwdnote"
                                    className={
                                        passwordFocus && newPassword && !validPassword
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    8 to 24 characters.
                                    <br />
                                    Must include uppercase and lowercase letters, a number and a special character.
                                    <br />
                                    <span className="nowrap">
                                        I agree to the{" "}
                                        <span className="line">Terms of Service</span> and{" "}
                                        <span className="line">Privacy Policy</span>
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#007654] focus:border-[#007654] focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={onConfirmPasswordChange}
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                />
                                <p
                                    id="confirmnote"
                                    className={
                                        matchFocus && confirmPassword && !validMatch
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    Must match the first password input field.
                                </p>
                            </div>
                        </div>

                        {errMsg && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FaTimes className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            {errMsg}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={!validPassword || !validMatch || isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#007654] hover:bg-[#105642] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007654] disabled:opacity-50 transition-all"
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};

export default ResetPassword; 