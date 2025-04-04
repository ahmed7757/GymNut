import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import gomaaAvatar from "../../assets/Gomaa.jpg"
import khaledAvatar from "../../assets/khaled.jpg"
import amrAvatar from "../../assets/Amr.jpg"
import AhmedGamalAvatar from "../../assets/Gamal.jpeg"
import ZakiAvatar from "../../assets/zaki.jpg"
import { motion } from "framer-motion";

const iconVariants = (duration) => ({
    initial: { y: -3 },
    animate: {
        y: [3, -3],
        transition: {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
})

const Team = () => {
    return (
        <section className="flex flex-col h-full gap-4 items-center p-4">
            <h1 className="text-6xl font-bold">Our team</h1>
            <div className="container flex lg:h-full items-center">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 md:flex-wrap flex-col gap-6 justify-around w-full">

                    <div className="card bg-green-900 md:col-span-1 dark:bg-neutral p-4 flex gap-2 felx-col justify-around shadow-md">
                        <div className="flex justify-between">
                            <div className="dark:ring-green-600 ring-green-950 ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img className="rounded-full" src={amrAvatar} />
                            </div>
                            <div className="flex flex-col gap-2 h-full justify-center text-lime-100 dark:text-current">
                                <motion.a
                                    variants={iconVariants(3)}
                                    initial="initial"
                                    animate="animate"
                                    target="_blank" href="https://www.linkedin.com/in/amr-ashraf-261752231/" className="text-2xl"><FaLinkedin /></motion.a>
                                <motion.a
                                    variants={iconVariants(3.5)}
                                    initial="initial"
                                    animate="animate"
                                    target="_blank" href="https://github.com/amrashraf2001" className="text-2xl"><FaSquareGithub /></motion.a>
                                <motion.a
                                    variants={iconVariants(4)}
                                    initial="initial"
                                    animate="animate"
                                    target="_blank" href="https://www.facebook.com/share/RjhqJdNP8cejY9Uj/" className="text-2xl"><FaFacebookSquare /></motion.a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between text-lime-100 dark:text-current">
                            <h2 className="text-xl font-bold">Amr Ashraf</h2>
                            <h3 className="text-lg"><strong>Role: </strong>Back-End</h3>
                        </div>
                        <div className="flex flex-col justify-between gap-2 text-lime-100 dark:text-current">
                            <h4 className="font-semibold text-lg">Contact information</h4>
                            <div className="flex flex-col justify-between gap-1">
                                <p>Email: <a href="mailto:Amrateia46@gmail.com">Amrateia46@gmail.com</a></p>
                                <p>Phone: +201067254077</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-green-900 md:col-span-1 dark:bg-neutral p-4 flex felx-col justify-around gap-2 shadow-md">
                        <div className="flex justify-between">
                            <div className="dark:ring-green-600 ring-green-950 ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img className="rounded-full" src={khaledAvatar} />
                            </div>
                            <div className="flex flex-col gap-2 h-full justify-center text-lime-100 dark:text-current">
                                <motion.a
                                    variants={iconVariants(3)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://www.linkedin.com/in/khaledkaram510/" className="text-2xl"><FaLinkedin /></motion.a>
                                <motion.a
                                    variants={iconVariants(3.5)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://github.com/khaledkaram510" className="text-2xl"><FaSquareGithub /></motion.a>
                                <motion.a
                                    variants={iconVariants(4)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://www.facebook.com/khalad3000" className="text-2xl"><FaFacebookSquare /></motion.a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between text-lime-100 dark:text-current">
                            <h2 className="text-xl font-bold">Khaled Karam</h2>
                            <h3 className="text-lg"><strong>Role: </strong>Back-End</h3>
                        </div>
                        <div className="flex flex-col justify-between gap-2 text-lime-100 dark:text-current">
                            <h4 className="font-semibold text-lg">Contact information</h4>
                            <div className="flex flex-col justify-between gap-1">
                                <p>Email: <a href="mailto:khaleddaib510@gmail.com">khaleddaib510@gmail.com</a></p>
                                <p>Phone: +201553176670</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-green-900 md:col-span-1 dark:bg-neutral gap-2 p-4 flex felx-col justify-around shadow-md">
                        <div className="flex justify-between">
                            <div className="dark:ring-green-600 ring-green-950 ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img className="rounded-full" src={gomaaAvatar} />
                            </div>
                            <div className="flex flex-col gap-2 h-full justify-center text-lime-100 dark:text-current">
                                <motion.a
                                    variants={iconVariants(3)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://www.linkedin.com/in/ahmed-gomaa-499b55254/" className="text-2xl"><FaLinkedin /></motion.a>
                                <motion.a
                                    variants={iconVariants(3.5)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://github.com/ahmed7757" className="text-2xl"><FaSquareGithub /></motion.a>
                                <motion.a
                                    variants={iconVariants(4)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://web.facebook.com/bin10zx" className="text-2xl"><FaFacebookSquare /></motion.a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between text-lime-100 dark:text-current">
                            <h2 className="text-xl font-bold">Ahmed Gomaa</h2>
                            <h3 className="text-lg"><strong>Role: </strong>Front-End</h3>
                        </div>
                        <div className="flex flex-col justify-between gap-2 text-lime-100 dark:text-current">
                            <h4 className="font-semibold text-lg">Contact information</h4>
                            <div className="flex flex-col justify-between gap-1">
                                <p>Email: <a href="mailto:ag849600@gmail.com">ag849600@gmail.com</a></p>
                                <p>Phone: +201117590628</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-green-900 md:col-span-1 dark:bg-neutral p-4 flex felx-col justify-around gap-2 shadow-md">
                        <div className="flex justify-between">
                            <div className="dark:ring-green-600 ring-green-950 ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                <img className="rounded-full w-full h-full object-cover" src={ZakiAvatar} alt="avatar" />
                            </div>
                            <div className="flex flex-col gap-2 h-full justify-center text-lime-100 dark:text-current">
                                <motion.a
                                    variants={iconVariants(3)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://www.linkedin.com/in/ahmed-zaki-8995152b6/" className="text-2xl"><FaLinkedin /></motion.a>
                                <motion.a
                                    variants={iconVariants(3.5)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://github.com/ahmed-zaki12" className="text-2xl"><FaSquareGithub /></motion.a>
                                <motion.a
                                    variants={iconVariants(4)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://www.facebook.com/ahmed.zakimohamed.3/" className="text-2xl"><FaFacebookSquare /></motion.a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between text-lime-100 dark:text-current">
                            <h2 className="text-xl font-bold">Ahmed Zaki</h2>
                            <h3 className="text-lg"><strong>Role: </strong>Front-End</h3>
                        </div>
                        <div className="flex flex-col justify-between gap-2 text-lime-100 dark:text-current">
                            <h4 className="font-semibold text-lg">Contact information</h4>
                            <div className="flex flex-col justify-between gap-1">
                                <p>Email: <a href="mailto:ahmed.zaki98763@gmail.com">ahmed.zaki98763@gmail.com</a></p>
                                <p>Phone: +201117734399</p>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-green-900 md:col-span-1 dark:bg-neutral p-4 gap-2 flex felx-col justify-around shadow-md">
                        <div className="flex justify-between">
                            <div className="dark:ring-green-600 ring-green-950 ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2">
                                <img className="w-full h-full object-cover rounded-full" src={AhmedGamalAvatar} alt="Avatar" />
                            </div>
                            <div className="flex flex-col gap-2 h-full justify-center text-lime-100 dark:text-current">
                                <motion.a
                                    variants={iconVariants(3)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://www.linkedin.com/in/ahmed-gamal-454538281/" className="text-2xl"><FaLinkedin /></motion.a>
                                <motion.a
                                    variants={iconVariants(3.5)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://github.com/Ahmedgamalsoli" className="text-2xl"><FaSquareGithub /></motion.a>
                                <motion.a
                                    variants={iconVariants(4)}
                                    initial="initial"
                                    animate="animate" target="_blank" href="https://www.facebook.com/outfit8111?mibextid=ZbWKwL" className="text-2xl"><FaFacebookSquare /></motion.a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between text-lime-100 dark:text-current">
                            <h2 className="text-xl font-bold">Ahmed Gamal</h2>
                            <h3 className="text-lg"><strong>Role: </strong>DataBase</h3>
                        </div>
                        <div className="flex flex-col justify-between gap-2 text-lime-100 dark:text-current">
                            <h4 className="font-semibold text-lg">Contact information</h4>
                            <div className="flex flex-col justify-between gap-1">
                                <p>Email: <a href="mailto:ahmedgamalsoliman497@gmail.com">ahmedgamal@gmail.com</a></p>
                                <p>Phone: +201021849114</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Team