import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import Chart from "react-apexcharts";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const MySurvey = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: mySurvey,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mySurvey", user?.email],
    queryFn: async () => {
      try {
        if (user?.email) {
          const res = await axiosSecure.get(
            `/mySurvey?user_email=${user?.email}`
          );
          return res.data || [];
        } else {
          return [];
        }
      } catch (error) {
        console.error("Error fetching mySurvey:", error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading survey data</p>;
  }

  console.log("mySurvey data:", mySurvey);

  return (
    <div>
      <div className="mt-20">
        <h1 className="text-4xl  text-center mb-10">My Survey</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-sky-500 text-white text-xs rounded-xl">
              <tr>
                <th>Survey Name && Description</th>
                <th>Survey Category &</th>
                <th>Like & DisLike</th>
                <th>Activity & Admin Feedback </th>
                <th>
                  <span>See The Vote & Cart Details</span> <br />{" "}
                  <span>& User Report & Comments</span>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {mySurvey?.map((survey) => (
                <tr key={survey._id} className="">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar w-52 flex-col">
                        <h1 className="text-xm">{survey.survey_title}</h1>

                        <p className="text-xs bg-slate-200 rounded-xl p-2 my-2">
                          {survey.survey_description}
                        </p>
                      </div>
                      <div>
                        <div className="font-bold"></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {/* You can open the modal using document.getElementById('ID').showModal() method */}

                    <dialog id="my_modal_4" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">Admit Feedback</h3>
                        <p className="py-4">{survey.feedback}</p>
                      </div>
                    </dialog>
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">The Vote</h3>
                        <p className="py-4">YES: {survey.yes}</p>
                        <p className="py-4">No: {survey.no}</p>

                        <div className="max-w-20 w-96 text-black">
                          <div className="text-black">
                            <Chart
                              className="w-full sm:w-auto md:w-auto"
                              height={800}
                              type="pie"
                              series={[survey.no, survey.yes]}
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
            
            {survey?.allUserReport?.map((report) => (
              <div key={survey?._id}>
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
            {survey?.userInfo?.map((report) => (
              <div key={survey?._id}>
            
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
                    <span className="badge badge-ghost badge-xs">
                      {survey.survey_category}{" "}
                    </span>
                    <br />
                    <span className="badge badge-ghost badge-xs">
                    <span className="badge badge-ghost badge-xs">
  {moment(survey.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}
</span>

                    </span>
                  </td>
                  <td>
                    <h2 className="text-base font-bold">
                      {" "}
                      <button className="flex mb-2 gap-x-3 border-2 border-green-500 p-2 rounded-lg cursor-not-allowed opacity-50">
                        <img
                          className="w-4 h-4"
                          src="https://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png"
                          alt=""
                        />
                        <span className="text-sm">{survey.like}</span>
                      </button>
                      <button className="flex gap-x-3 border-2 border-green-500 p-2 rounded-lg cursor-not-allowed opacity-50">
                        <img
                          className="w-5 h-5"
                          src="https://pngimg.com/uploads/dislike/dislike_PNG53.png"
                          alt=""
                        />
                        <span className="text-sm">{survey.disLike}</span>
                      </button>{" "}
                    </h2>
                  </td>
                  <td className="ml-20">
                    <h1 className="font-bold">{survey.activity}</h1>
                    <button
                      className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5 mt-5"
                      onClick={() =>
                        document.getElementById("my_modal_4").showModal()
                      }
                    >
                      Admin Feedback
                    </button>
                  </td>

                  <th>
                    <button
                      className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5 mt-5"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      See All Details
                    </button>
                    <br />
                    <Link to={`/dashboard/update/${survey._id}`}  className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-black mb-5 mt-5">Update</Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MySurvey;
