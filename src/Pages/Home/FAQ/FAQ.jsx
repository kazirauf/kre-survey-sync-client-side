import { Disclosure } from "@headlessui/react";


const FAQ = () => {
    return (
        <div data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine" className="lg:mx-20 mt-10 mb-32">
           <h1 className="text-center font-bold text-green-500 text-4xl mb-10">Some FAQ</h1>
       {/* <div>
      
            <div className="collapse collapse-plus bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5">
  <input type="radio" name="my-accordion-3" checked="checked" /> 
  <div className="collapse-title text-xl font-medium">
  How to make a survey?
  </div>
  <div className="collapse-content"> 
    <p>First you have to be a registered user and then you can create a survey on the dashboard</p>
  </div>
</div>
<div className="collapse collapse-plus bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
  What does it take to become a pro user?
  </div>
  <div className="collapse-content"> 
    <p>
To become a pro user, you will first be charged $10 with your card number</p>
  </div>
</div>
<div className="collapse collapse-plus bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5">
  <input type="radio" name="my-accordion-3" /> 
  <div className="collapse-title text-xl font-medium">
  What does it take to become an admin?
  </div>
  <div className="collapse-content"> 
    <p>If you want to be an admin, you need to register as a user first. After becoming a registered user, you can continue to stay on this website for a certain period. During that time, if the admin thinks you are suitable to be an admin, then you will be made an admin.</p>
  </div>
</div>
       </div> */}
<div className="w-full px-4 pt-16">
      <div className="mx-auto w-full lg:max-w-3xl max-w-sm rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-xl">How to make a survey?</span>
                <button
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-lg text-gray-500">
              First you have to be a registered user and then you can create a survey on the dashboard
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-xl">What does it take to become a pro user?</span>
                <button
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 text-lg pt-4 text-sm text-gray-500">
              To become a pro user, you will first be charged $10 with your card number
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-xl"> What does it take to become an admin?</span>
                <button
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 text-lg pt-4 text-sm text-gray-500">
              If you want to be an admin, you need to register as a user first. After becoming a registered user, you can continue to stay on this website for a certain period. During that time, if the admin thinks you are suitable to be an admin, then you will be made an admin.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
        </div>
    );
};

export default FAQ;