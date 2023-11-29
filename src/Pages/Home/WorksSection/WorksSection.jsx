import { Link } from "react-router-dom";

const WorksSection = () => {
    return (
        <div data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000" className="mt-20 mb-32">
            <h1 className="text-center font-bold text-green-500 text-4xl mb-10">How Works Our Survey</h1>
            <div className="hero ">
           
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="lg:max-w-2xl max-w-xs rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold"><span className="text-green-500">Welcome</span> to our KRE survey sink</h1>
      <p className="mt-5">Here you can participate in any survey</p>
      <p className="py-2">You can create surveys as you wish</p>
      <p className="mb-3">If you want, you will become a pro user by paying money</p>
      <p className="mb-10">If you have some days you can be an admin
</p>
      <Link to="/surveys" className="py-2.5 px-5 rounded-md font-bold mt-5 mt-5 bg-gradient-to-r from-green-500 to-lime-500 text-white">Get Start Now</Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default WorksSection;