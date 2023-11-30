/* eslint-disable react/no-unescaped-entities */

const HelpCenter = () => {
    return (
        <div>
              <div>
             <div className="mt-10 lg:ml-0 md:ml-0 ml-10">
              <h1 className="text-center text-5xl font-bold lg:mr-32">Help Center</h1>
              <div className="bg-red-100 lg:w-[1000px] md:mx-60 w-[400px] rounded-xl py-10 my-10" >
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
        
                
              </div>
              
              
              </div>
              <div className="flex justify-center mb-20">

<div>
<div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <p>Write here any help you need Don't ask for irrelevant help</p>
</div>
<textarea className="textarea textarea-accent w-full mt-5" placeholder="help"></textarea>

<div className="flex justify-center">
    
<button className="btn  bg-gradient-to-r from-amber-500 to-lime-500 text-white font-bold  mt-10">

Submit
</button>
</div>
</div>

 </div>
 
              </div>
              
        </div>
        </div>
        </div>
    );
};

export default HelpCenter;