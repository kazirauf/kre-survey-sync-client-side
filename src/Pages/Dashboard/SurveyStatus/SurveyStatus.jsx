import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import moment from "moment";
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
    <th><span>Option &</span>  <br /><span> see all details of the survey</span></th>
   
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
              <span className="badge badge-ghost badge-xs">
  {moment(u.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}
</span>

         
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
         <br />
         <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">The Vote</h3>
                        <p className="py-4">YES: {u.yes}</p>
                        <p className="py-4">No: {u.no}</p>

                        <div className="max-w-20 w-96 text-black">
                          <div className="text-black">
                            <Chart
                              className="w-full sm:w-auto md:w-auto"
                              height={800}
                              type="pie"
                              series={[u.no, u.yes]}
                              options={{
                                labels: ["No", "Yes"],
                                legend: { position: "bottom" },
                                colors: ["#FF444A", "#00C49F"],
                              }}
                            />
                          </div>

                          <div className="lg:mt-20 shadow-xl  bg-base-100 ">
          <div className="border-2 border-red-500 p-5 rounded-lg">
            <h2 className="text-center text-xl font-bold">Report</h2>
            
            {u?.allUserReport?.map((report) => (
              <div key={_id}>
                {" "}
                <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={report?.userImage} />
      <span>{report?.userEmail}</span>
    </div>
  </div>
  <div className="chat-bubble">{report?.report}</div>
</div>

              </div>
            ))}
          </div>
          <div className="border-2 border-green-500 mt-5 p-5 rounded-lg">
            <h2 className="text-center text-xl font-bold">Pro User Comment</h2>
            {u?.userInfo?.map((report) => (
              <div key={u._id}>
            
                <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src={report?.userImage} />
      <span>{report?.userEmail}</span>
    </div>
  </div>
  <div className="chat-bubble bg-sky-500">{report?.comment}</div>
</div>
              </div>
            ))}
          </div>
        </div>
                        </div>
                      </div>
                    </dialog>
 <button
                      className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5 mt-5"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      See All Details
                    </button>
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