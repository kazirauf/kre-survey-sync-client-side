import { Link } from "react-router-dom";


const HeroSection = () => {
    return (
        <div>
        <div data-aos="fade-right"
 data-aos-anchor="#example-anchor"
 data-aos-offset="500"
 data-aos-duration="2500"
 
 className="hero lg:min-h-[700px]" style={{backgroundImage: 'url(https://1843972.fs1.hubspotusercontent-na1.net/hub/1843972/hubfs/Open%20ended%20polls.png?width=800&name=Open%20ended%20polls.png)'}}>
<div className="hero-overlay bg-opacity-60"></div>
<div className="hero-content text-center text-neutral-content">
<div className="lg:max-w-5xl max-w-md">
  <h1 className="mb-5 text-4xl font-bold">
<span className="text-green-400">Welcome everyone</span>, this is a website where you can poll and vote on any server. If you want, you can become a pro member</h1>
  <Link to="/surveys" className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-green-500 to-lime-500 text-white">Explore</Link>
</div>
</div>
</div>
    </div>
    );
};

export default HeroSection;