import FAQ from "../FAQ/FAQ";
import HeroSection from "../HeroSection/HeroSection";
import Testimonials from "../Testimonials/Testimonials";
import WorksSection from "../WorksSection/WorksSection";

const Home = () => {
    return (
        <div>
        <HeroSection></HeroSection>
        <WorksSection></WorksSection>
        <Testimonials></Testimonials>
        <FAQ></FAQ>
    
        </div>
    );
};

export default Home;