import Hero from "../../components/Hero"
import About from "../../components/About"
import Services from "../../components/Services"
import Contact from "../../components/Contact"
import Footer from "../../components/Footer"
import { FaArrowAltCircleUp } from "react-icons/fa";

const LandingPage = () => {
    return (
        <section className="flex flex-col gap-8">
            <a href="#Hero" className=" right-10 bottom-10 text-4xl z-50 transition hover:-translate-y-2 text-[#346859] glass rounded-full fixed "><FaArrowAltCircleUp /></a>
            <Hero />
            <About />
            <Services />
            <Contact />
            <Footer />
        </section>

    )
}

export default LandingPage