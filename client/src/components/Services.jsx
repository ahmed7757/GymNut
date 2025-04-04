import { motion } from "framer-motion";

const iconVariants = (duration) => ({
    initial: { y: -10 },
    animate: {
        y: [10, -10],
        transition: {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
})

const Services = () => {
    return (
        <section className=" flex-col space-y-10 px-14 py-14 " id="Services">
            <motion.h2
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-center">SERVICES</motion.h2>
            <div className="flex max-[768px]:justify-center max-[768px]:gap-8 gap-3 flex-wrap ">
                <motion.div
                    variants={iconVariants(1.5)}
                    initial="initial"
                    animate="animate"
                    className="flex-col p-5  bg-gradient-to-b from-green-400 to-green-900 dark:from-neutral-400 dark:to-neutral-700 rounded-2xl shadow-xl shadow-[#007654] dark:shadow-[#1e1e2d] space-y-2 transition dark:text-[#0d1906]">
                    <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Nutrition Plans</h2>
                    <p className="text-xl font-medium w-[300px]">Our customized nutrition plans are tailored to your unique dietary needs, preferences, and lifestyle. After a detailed assessment, we create a plan that aligns with your goals, whether you're aiming for weight loss, muscle gain, improved energy, or overall health</p>
                </motion.div>
                <motion.div
                    variants={iconVariants(2.5)}
                    initial="initial"
                    animate="animate"
                    className="flex-col p-5  bg-gradient-to-b from-green-400 to-green-900 rounded-2xl dark:from-neutral-400 dark:to-neutral-700 shadow-xl shadow-[#007654] dark:shadow-[#1e1e2d] space-y-2 transition dark:text-[#0d1906]">
                    <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Meal Planning
                    </h2>
                    <p className="text-xl font-medium w-[300px]">Take the guesswork out of meal preparation with our curated meal plans. Each plan includes easy-to-follow recipes, portion sizes, and grocery lists, ensuring you have everything you need for a week of healthy eating. We offer plans for various dietary preferences, including vegetarian, vegan, gluten-free, and more.</p>
                </motion.div>
                <motion.div
                    variants={iconVariants(3.5)}
                    initial="initial"
                    animate="animate"
                    className="flex-col p-5  bg-gradient-to-b from-green-400 to-green-900 rounded-2xl dark:from-neutral-400 dark:to-neutral-700 shadow-xl shadow-[#007654] dark:shadow-[#1e1e2d] space-y-2 transition dark:text-[#0d1906]">
                    <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Recipe Library</h2>
                    <p className="text-xl font-medium w-[300px]">Access a vast collection of delicious, nutrient-dense recipes that cater to a wide range of dietary preferences and needs. Our recipe library is constantly updated to provide you with fresh ideas for meals that are both tasty and healthy.</p>
                </motion.div>
                <motion.div
                    variants={iconVariants(4.5)}
                    initial="initial"
                    animate="animate"
                    className="flex-col p-5  bg-gradient-to-b from-green-400 to-green-900 rounded-2xl dark:from-neutral-400 dark:to-neutral-700 shadow-xl shadow-[#007654] dark:shadow-[#1e1e2d] space-y-2 transition dark:text-[#0d1906]">
                    <h2 className="text-3xl font-bold text-green-950 hover:text-green-950">Healthy Programs</h2>
                    <p className="text-xl font-medium w-[300px]">We offer specialized programs to support various health conditions and goals, such as diabetes management, heart health, digestive wellness, and sports nutrition. These programs include targeted meal plans, educational resources, and ongoing support.</p>
                </motion.div>
            </div>
        </section>
    )
}

export default Services