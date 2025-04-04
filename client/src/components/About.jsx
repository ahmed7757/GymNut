import about1 from '../assets/about1.png'
import about2 from '../assets/about2.png'
import { motion } from "framer-motion";

const About = () => {
    return (
        <section className=" flex flex-col space-y-10 px-14 pt-14 pb-40 " id="About">
            <motion.h2
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-center">ABOUT US</motion.h2>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 200 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-3xl font-medium text-center p-3 transition-all text-green-950 dark:text-[#467165]">Welcome to GYMNUT, your trusted partner in achieving a healthier lifestyle through balanced nutrition and personalized meal planning. We believe that good food is the foundation of a happy, healthy life, and we're here to guide you on your journey to wellness.</p>
            </motion.div>
            <div className="flex gap-12 items-center md:flex-row-reverse flex-col ">
                <motion.img
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 200 }}
                    transition={{ duration: 0.5 }}
                    src={about1} className="max-h-80 shadow-lg shadow-[#007654] dark:shadow-[#1e1e2d] rounded-3xl max-w-[20rem]" />
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 text-center">
                    <h2
                        className="text-3xl font-bold text-green-900 dark:text-current">Our Mission</h2>
                    <p
                        className=" text-green-950 text-2xl font-medium p-3 transition-all dark:text-[#467165] hover:shadow-[#007654]">At GYMNUT, our mission is to make healthy eating accessible, enjoyable, and sustainable. We understand that everyone's nutritional needs and preferences are unique, which is why we offer personalized plans that cater to your specific goals, whether it's weight management or simply adopting a healthier lifestyle.</p>
                </motion.div>
            </div>

            <div className="flex gap-12 items-center flex-col md:flex-row  ">
                <motion.img
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.5 }} src={about2} className="max-h-80 dark:shadow-[#1e1e2d] shadow-lg shadow-[#007654] rounded-3xl max-w-[20rem]" />
                <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 200 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold text-green-900 dark:text-current">Why Choose Us?</h2>
                    <p className=" text-green-950 text-2xl font-medium p-3 transition-all dark:text-[#467165] ">We are committed to providing you with the tools, resources, and knowledge to make informed decisions about your diet and nutrition. Our plans are not just about food; they're about building lasting habits that contribute to your overall well-being. With GYMNUT, you can take control of your health with confidence and ease.</p>
                </motion.div>
            </div>
        </section>
    )
}

export default About