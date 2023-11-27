import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useAdmin from "../../hook/useAdmin";

const DashboardLayout = () => {
  const [isAdmin] = useAdmin();
    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center ">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    <Outlet></Outlet>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul  style={{backgroundImage: 'url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlkZW8lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww)'}} className="menu p-4 w-80 min-h-full border-4 border-lime-400 text-base-content">
      {/* Sidebar content here */}
      {
        isAdmin ?
        
        <>
      <li><FaHome></FaHome> <Link className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5"  to="surveyCreation">Admin Home</Link></li>
      <li><Link className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5"  to="surveyStatus">Survey Status</Link></li>
      <li><Link className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5"  to="users">Users</Link></li>
      <hr />
      <li><Link className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5 mt-5"  to="/">Back To Home</Link></li>
        </>
        :
        <>
          <li><Link className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5"  to="surveyCreation">My Survey</Link></li>
      <li><Link className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5"  to="surveyCreation">Survey Creation</Link></li>
      <hr />
      <li><Link className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5 mt-5"  to="/">Back To Home</Link></li>
        </>
      }
    
 
    </ul>
  
  </div>
</div>
            
        </div>
    );
};

export default DashboardLayout;