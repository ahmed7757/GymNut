import { Link } from "react-router-dom"
import './hero.css'
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className=" flex justify-center dark:bg-dark-hero-pattern  bg-hero-pattern bg-cover h-screen" id="Hero">

            <div className=" flex flex-col text-center items-center justify-center pt-6 md:pt-0 gap-6 md:px-14 px-6">
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-2  ">
                    <h2 className="font-extrabold md:text-7xl drop-shadow-xl text-center text-[#007654] text-4xl dark:text-[#0a3126]">Gym Nutrition</h2>
                    <h3 className="font-extrabold md:text-6xl drop-shadow-xl text-center text-[#94e453] text-3xl dark:text-[#4b752a]">Set your plan</h3>
                </motion.div>
                <motion.p
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 200 }}
                    transition={{ duration: 0.7 }}
                    className="text-xl font-medium max-w-xl text-[#246150] dark:text-[#467165]">
                    This website is designed for individuals interested in fitness, nutrition, and healthy living. It provides essential information on gym nutrition, healthy eating, and calorie management, catering to goals such as muscle building, weight loss, or maintaining a balanced diet. Users can access tailored plans, recipes, and advice to support their fitness journeys and improve their overall health.
                </motion.p>
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.9 }}
                >
                    <Link className="md:px-14 md:py-4 px-8 py-2 md:w-64 w-32 bg-[#007654] dark:bg-[#0a3126] transition hover:bg-[#105642] text-[#fefefe] rounded-lg text-center items-center md:text-2xl text-lg overflow-hidden animation self-center" to={"/register"}></Link>
                </motion.div>
            </div>
        </section>
    )
}
export default Hero