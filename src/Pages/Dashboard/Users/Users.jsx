import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";


const Users = () => {
    const axiosSecure = useAxiosSecure()
    const [userData, setuserData] = useState([]);
    const [reloaded, setReloaded] = useState(false);
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          setReloaded(true);
          const res = await axiosSecure.get('/users');
          return res.data;
        },
      });
      
      const handleAdmin = (u) => {
        axiosSecure.patch(`/users/admin/${u._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch(); // Move this line here, so it's called only after the patch request is successful.
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: `${u.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };
      

      const handleDeleteUser = u => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${u._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your user has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

      const handleSurveyor = (u) => {
        axiosSecure.patch(`/users/surveyor/${u._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch(); // Move this line here, so it's called only after the patch request is successful.
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: `${u.name} is an Surveyor Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };
      
      const handleCategory = (event) => {
        event.preventDefault();
        const form = event.target.value;
        console.log(form);
        const data = users.filter((s) => s.role === form);
        setuserData(data);
        setReloaded(false);
      }

    return (
        <div className="mt-20">
            <h1 className="text-4xl  text-center mb-10">All Users</h1>
         <div className="flex justify-center">
         <select
        onChange={handleCategory}
        className="w-full px-4 mb-10 py-2 border-2 rounded-xl border-lime-500 focus:outline-none focus:border-lime-400 focus:bg-white"
        name="survey_category"
      >
        <option value="admin">admin</option>
        <option value="pro user">pro user</option>
        <option value="surveyor">surveyor</option>
        <option value="user">user</option>
        
      </select>
         </div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="bg-sky-500 text-white text-base rounded-xl">
      <tr>
      
        <th>Users</th>
        <th>Email</th>
        
        <th>User Role</th>
        <th>----Options----</th>
        <th>Actions</th>
       
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
       reloaded ?
       users.map(u =>  <tr key={u._id} className="">
        
       <td>
         <div className="flex items-center gap-3">
           <div className="avatar">
             <div className="mask mask-squircle w-12 h-12">
               <img src={u.image} alt="Avatar Tailwind CSS Component" />
             </div>
           </div>
           <div>
             <div className="font-bold">{u.name}</div>
           
           </div>
         </div>
       </td>
       <td>

         <span className="badge badge-ghost badge-sm"> {u.email}</span>
       </td>
       <td>

         <h2 className="text-base font-bold"> {u.role}</h2>
       </td>
     <td className="ml-20">
     {
       u.role === 'admin' ?
       <button onClick={() => handleAdmin(u)} className="hidden btn btn-sm  px-2 font-bold mt-6 bg-yellow-500 mr-2 text-white">Admin</button>
       :
       <button onClick={() => handleAdmin(u)} className="btn btn-sm  px-2 font-bold mt-6 bg-yellow-500 mr-2 text-white">Admin</button>
      }
       {
           u.role === 'surveyor' ?
           <button className="btn btn-sm mt-6 px-2 bg-green-500 text-white hidden">Surveyor</button>
           :
           <button onClick={() => handleSurveyor(u)} className="btn btn-sm mt-6 px-2 bg-green-500 text-white">Surveyor</button>
       }
     </td>
    
       <th>
         <button onClick={() =>  handleDeleteUser(u)} className="btn btn-sm bg-red-500 text-white">Delete</button>
       </th>
     </tr>)
     :
     userData.map(u =>  <tr key={u._id} className="">
        
     <td>
       <div className="flex items-center gap-3">
         <div className="avatar">
           <div className="mask mask-squircle w-12 h-12">
             <img src={u.image} alt="Avatar Tailwind CSS Component" />
           </div>
         </div>
         <div>
           <div className="font-bold">{u.name}</div>
         
         </div>
       </div>
     </td>
     <td>

       <span className="badge badge-ghost badge-sm"> {u.email}</span>
     </td>
     <td>

       <h2 className="text-base font-bold"> {u.role}</h2>
     </td>
   <td className="ml-20">
   {
     u.role === 'admin' ?
     <button onClick={() => handleAdmin(u)} className="hidden btn btn-sm  px-2 font-bold mt-6 bg-yellow-500 mr-2 text-white">Admin</button>
     :
     <button onClick={() => handleAdmin(u)} className="btn btn-sm  px-2 font-bold mt-6 bg-yellow-500 mr-2 text-white">Admin</button>
    }
     {
         u.role === 'surveyor' ?
         <button className="btn btn-sm mt-6 px-2 bg-green-500 text-white hidden">Surveyor</button>
         :
         <button onClick={() => handleSurveyor(u)} className="btn btn-sm mt-6 px-2 bg-green-500 text-white">Surveyor</button>
     }
   </td>
  
     <th>
       <button onClick={() =>  handleDeleteUser(u)} className="btn btn-sm bg-red-500 text-white">Delete</button>
     </th>
   </tr>)
      }
  

    </tbody>
 
    
  </table>
</div>
        </div>
    );
};

export default Users;