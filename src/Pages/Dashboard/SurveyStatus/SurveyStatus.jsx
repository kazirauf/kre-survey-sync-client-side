import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SurveyStatus = () => {
    const axiosSecure = useAxiosSecure()
 


    const { data: surveyCreation = [], refetch } = useQuery({
        queryKey: ['surveyCreation'],
        queryFn: async () => {
          const res = await axiosSecure.get('/surveyCreation');
          return res.data;
        },
      });

   

      const handlePublish = (u) => {
        axiosSecure.patch(`/surveyCreation/publish/${u._id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            refetch(); // Move this line here, so it's called only after the patch request is successful.
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: `${u.name} the survey is Published`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };


   

    

    return (
        <div className="mt-20">
        <h1 className="text-4xl  text-center mb-10">All surveyCreation</h1>
        <div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead className="bg-sky-500 text-white text-base rounded-xl">
  <tr>
  
    <th>Survey</th>
    <th>Details</th>
    
    <th>Category & User Email</th>
    <th>----Activities----</th>
    <th>Option</th>
   
  </tr>
</thead>
<tbody>
  {/* row 1 */}
  {
    surveyCreation.map(u => 
     <tr key={u._id} className="">
    
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold text-sm">{u.survey_title}</div>
              <div className="font-bold text-xs">{u.timeStamp}</div>
         
            </div>
          </div>
        </td>
        <td>

          <span className="badge badge-ghost badge-xs w-40"> {u.survey_description}</span>
        
        </td>
        <td>

          <h2 className="text-sm font-bold"> {u.survey_category}</h2>
          <span className="badge badge-ghost badge-xs w-40"> {u.user_email}</span>
        </td>
      <td className="ml-20">
      <span className="badge badge-ghost badge-xs">Like: {u.like}</span>
      <br />
      <span className="badge badge-ghost badge-xs ">DisLike: {u.disLike}</span>
      <br />
      <span className="badge badge-ghost badge-xs ">Yes Vote: {u.yes}</span>
      <span className="badge badge-ghost badge-xs ">No Vote: {u.no}</span>
       
      </td>


     
        <th>
   
        
         {
          u.activity === 'unpublished' || u.activity === 'published'  ?
          <h1>{u.activity}</h1>
          :
       <>
          <button onClick={() => handlePublish(u)} className="btn btn-sm bg-cyan-500 text-white">Publish</button>
          <br />
          <Link to={`/dashboard/feedback/${u._id}`} className="btn btn-sm bg-violet-500 text-white mt-2">Unpublish</Link>
       </>
         }

        </th>
      </tr>
      )
  }


</tbody>


</table>
</div>
    </div>
    );
};

export default SurveyStatus;