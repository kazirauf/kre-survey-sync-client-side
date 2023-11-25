import { NavLink } from "react-router-dom";
import useAuth from "../../../hook/useAuth";


const Navbar = () => {
    const {user, logOut} = useAuth()

    const handleSignOut = () => {
      logOut()
      .then() 
      .catch()
    }
    const Navlink = <>
    <li><NavLink className="text-lg font-bold" to="/">Home</NavLink></li>
    <li><NavLink className="text-lg font-bold" to="/surveys">Surveys</NavLink></li>
    <li><NavLink className="text-lg font-bold" to="/pricing">Pricing</NavLink></li>
    <li><NavLink className="text-lg font-bold" to="/dashboard">Dashboard</NavLink></li>
    </>
      return (
          <div>
              <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
         {Navlink}
        </ul>
      </div>
      <NavLink to="/" className="btn btn-ghost ">
        <img className="w-16" src="https://png.pngtree.com/png-vector/20220625/ourmid/pngtree-clipboard-icon-design-vector-png-image_5335667.png"
         alt="" />
         <h2 className="text-lg">KRE Survey Sync</h2>
  
      </NavLink>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
      {Navlink}
      </ul>
    </div>
    <div className="navbar-end gap-x-3">
            {user ? (
              <div className=" items-center gap-3 mr-3 hidden lg:flex">
                <img
                  className="w-12 h-12 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
                <div>
                  <h1 className="">{user?.displayName}</h1>
                </div>
              </div>
            ) : (
              <img
                className="w-12 rounded-full mr-3 border-2 border-lime-400-400"
                src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                alt=""
              />
            )}
            {user ? (
           <button onClick={handleSignOut} className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-green-500 to-lime-500 text-white" to="/login">Log Out</button>
          
            ) : (
              <>
               <NavLink className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-green-500 to-lime-500 text-white" to="/login">Login</NavLink>
               <NavLink  className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-green-500 to-lime-500 text-white" to="/register">Register</NavLink>
             
              </>
            )}
         
   
    </div>
  </div>
          </div>
      );
};

export default Navbar;