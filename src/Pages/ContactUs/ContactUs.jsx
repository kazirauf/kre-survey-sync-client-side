const ContactUs = () => {
    return (
        <div>
             <div className="mt-10 lg:ml-0 md:ml-0 ml-10">
              <h1 className="text-center text-5xl font-bold lg:mr-32">Contact Us</h1>
              <div className="bg-green-100 lg:w-[1000px] md:mx-60 w-[400px] rounded-xl py-10 my-10" >
              <div className="flex justify-center mt-10   ">
              <div className="grid lg:grid-cols-2  grid-cols-1 gap-x-32 gap-y-10 py-10">
                <div className="">
                    <h3 className="text-xl font-bold mb-3">Your Name</h3>
                <input type="text" placeholder="Your Name" className="input input-bordered input-primary w-[400px] " />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-3">Your Email</h3>
                <input type="email" placeholder="Your Email" className="input input-bordered input-primary w-[400px]" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-3">Your Phone Number</h3>
                <input type="number" placeholder="Your Phone Number" className="input input-bordered input-primary w-[400px] " />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-3">Your Address</h3>
                <input type="text" placeholder="Your Address" className="input input-bordered input-primary w-[400px] " />
                </div>
                
              </div>
              
              
              </div>
              <div className="flex justify-center mb-20">

       
<button className="btn  bg-gradient-to-r from-amber-500 to-lime-500 text-white font-bold  mt-10">

 Submit
</button> </div>
              </div>
              
        </div>
        </div>
    );
};

export default ContactUs;