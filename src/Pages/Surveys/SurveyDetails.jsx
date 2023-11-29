import Chart from "react-apexcharts";

import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import moment from "moment";

const SurveyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const [voted, setVoted] = useState(false);
  const [likeOrDislike, setLikeOrDislike] = useState(null);

  const { id } = useParams();
  const { user } = useAuth();
  const { data: myRole = [] } = useQuery({
    queryKey: ["myRole", user?.email],
    queryFn: async () => {
      try {
        if (user && user.email) {
          const res = await axiosSecure.get(`/myRole?email=${user?.email}`);
          return res.data;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching myRole:", error);
        throw error;
      }
    },
  });

  const { data: surveyDetails = [], refetch } = useQuery({
    queryKey: ["surveyDetails", id],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/surveyCreation/${id}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching survey details:", error);
        throw error;
      }
    },
  });

  console.log(myRole);
  const {
    _id,
    survey_title,
    timeStamp,
    survey_description,
    survey_category,
    user_email,
    like,
    disLike,
    yes,
    no,
    allUserReport,
    userInfo,
    
  } = surveyDetails;
  console.log(allUserReport);
  console.log(userInfo);

  const chartData = {
    series: [yes, no],
    options: {
      labels: ["Yes", "No"],
      colors: ["#00C49F", "#FF444A"],
    },
  };
  useEffect(() => {
    const hasVoted = localStorage.getItem(`survey_${_id}_voted`);
    if (hasVoted === "true") {
      setVoted(true);
    }
  }, [_id]);

  const handleNo = (id) => {
    let n = no;
    console.log(n);
    let totalYes = n + 1;
    console.log(totalYes);
    axiosSecure
      .put(`/surveyCreation/no/${id}`, { no: totalYes })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `your vote is no`,
            showConfirmButton: false,
            timer: 1500,
          });
          setVoted(true);

          localStorage.setItem(`survey_${id}_voted`, "true");
        }
      });
  };
  const handleYes = (id) => {
    let y = yes;
    let totalYes = y + 1;
    console.log(totalYes);
    axiosSecure
      .put(`/surveyCreation/yes/${id}`, { yes: totalYes })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `your vote is yes`,
            showConfirmButton: false,
            timer: 1500,
          });
          setVoted(true);

          localStorage.setItem(`survey_${id}_voted`, "true");
        }
      });
  };

  const handleLike = (id) => {
    let l = like;
    let totalLike = l + 1;

    axiosSecure
      .put(`/surveyCreation/like/${id}`, { like: totalLike })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Like`,
            showConfirmButton: false,
            timer: 1500,
          });

          setLikeOrDislike("like");
        }
      });
  };

  const handleDislike = (id) => {
    let d = disLike;
    let totalDislike = d + 1;

    axiosSecure
      .put(`/surveyCreation/disLike/${id}`, { disLike: totalDislike })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `DisLike`,
            showConfirmButton: false,
            timer: 1500,
          });

          setLikeOrDislike("dislike");
        }
      });
  };

  const handleComment = (e) => {
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;
    const userInfo = {
      userComment: {
        userEmail: user?.email,
        userImage: user?.photoURL,
        comment: comment,
      },
    };
    console.log("Sending data:", userInfo);
    axiosSecure.post(`/surveyCreation/${_id}`, userInfo).then((res) => {
      console.log(res);
      if (res.data.modifiedCount > 0) {
        refetch();
        form.reset(" ");
        console.log(res.data.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user?.displayName} your comment is added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleReport = async (e) => {
    e.preventDefault();
    const form = e.target;
    const report = form.report.value;

    if (!report) {
      return;
    }

    const allUserReport = {
      userReport: {
        userEmail: user?.email,
        userImage: user?.photoURL,
        report: report,
      },
    };

    try {
      const response = await axiosSecure.post(
        `/surveyCreation/report/${_id}`,
        allUserReport
      );

      if (response.data.modifiedCount > 0) {
        refetch();
        form.reset();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user?.displayName} your comment is added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
   

<div className=" flex lg:flex-row lg:justify-between lg:mr-72 mt-10 flex-col ">
      <div className=" card w-96 lg:w-[600px] lg:ml-20 mt-20 shadow-xl">
        <div>
          <div className="card-body">
            <h2 className="text-2xl">{survey_title}</h2>
            <br />
            <p>{survey_description}</p>
            <p> {moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
            <div>
              <h1 className="text-xl">
                Sit here as if you want to vote for him :
              </h1>
              <div className="mt-5">
              {
                myRole?.role === 'pro user' || myRole?.role === 'user' ?
                !voted && (
                  <>
                    <button
                      onClick={() => handleYes(_id)}
                      className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-white mb-5 mr-2"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleNo(_id)}
                      className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-white mb-5"
                    >
                      No
                    </button>
                  </>
                )
                :
                !voted && (
                  <>
                    <button
                      onClick={() => handleYes(_id)}
                      className="py-2.5 px-5 hidden rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-white mb-5 mr-2"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleNo(_id)}
                      className="py-2.5 px-5 hidden rounded-md font-bold bg-gradient-to-r from-amber-500 to-lime-500 text-white mb-5"
                    >
                      No
                    </button>
                  </>
                )
              }
              </div>
            </div>
            <p className="font-bold text-amber-600 mt-5 mb-5">
              {survey_category}
            </p>
            <p className="text-sky-600 font-bold">User Email: {user_email}</p>
            <div className="card-actions ">
              <button
                onClick={() => handleLike(_id)}
                className={`flex gap-x-3 border-2 border-green-500 p-2 rounded-lg ${
                  likeOrDislike === "like"
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={
                  likeOrDislike === "like" || likeOrDislike === "dislike"
                }
              >
                <img
                  className="w-7 h-7"
                  src="https://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png"
                  alt=""
                />
                <span className="text-xl">{like}</span>
              </button>
              <button
                onClick={() => handleDislike(_id)}
                className={`flex gap-x-3 border-2 border-green-500 p-2 rounded-lg ${
                  likeOrDislike === "dislike"
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
                disabled={
                  likeOrDislike === "dislike" || likeOrDislike === "like"
                }
              >
                <img
                  className="w-7 h-7"
                  src="https://pngimg.com/uploads/dislike/dislike_PNG53.png"
                  alt=""
                />
                <span className="text-xl">{disLike}</span>
              </button>
            </div>
          </div>
        </div>
        {
          myRole?.role === 'pro user' || myRole?.role === 'user' ?
          <div className="card w-96 lg:w-[600px]  mt-20 bg-base-100 shadow-xl p-10">
          {myRole?.role === "pro user" ? (
            <div>
              <h1>Are you want to comment this survey </h1>
              <form onSubmit={handleComment}>
                <textarea
                  name="comment"
                  className="textarea textarea-success mt-5"
                  placeholder="comment now!"
                ></textarea>
                <br />
                <input
                  type="submit"
                  value="Submit"
                  className="text-white bg-green-700 rounded-lg py-2 px-4 my-5"
                />
              </form>
            </div>
          ) : (
            <div className="hidden">
              <h1>Are you want to comment this survey </h1>
              <form>
                <textarea
                  className="textarea textarea-success mt-5"
                  placeholder="comment now!"
                ></textarea>
              </form>
            </div>
          )}
          <div>
            <h1>
              Are you want to report this survey for inappropriate content?
            </h1>
            <form onSubmit={handleReport}>
              <textarea
                name="report"
                className="textarea textarea-error mt-5"
                placeholder="report now!"
              ></textarea>
              <br />
              <button className="text-white bg-red-500 rounded-lg py-2 px-4 my-5">
                Submit
              </button>
            </form>
          </div>
        </div>
        :
        <div className="card hidden w-96 lg:w-[600px]  mt-20 bg-base-100 shadow-xl p-10">
          {myRole?.role === "pro user" ? (
            <div>
              <h1>Are you want to comment this survey </h1>
              <form onSubmit={handleComment}>
                <textarea
                  name="comment"
                  className="textarea textarea-success mt-5"
                  placeholder="comment now!"
                ></textarea>
                <br />
                <input
                  type="submit"
                  value="Submit"
                  className="text-white bg-green-700 rounded-lg py-2 px-4 my-5"
                />
              </form>
            </div>
          ) : (
            <div className="hidden">
              <h1>Are you want to comment this survey </h1>
              <form>
                <textarea
                  className="textarea textarea-success mt-5"
                  placeholder="comment now!"
                ></textarea>
              </form>
            </div>
          )}
          <div>
            <h1>
              Are you want to report this survey for inappropriate content?
            </h1>
            <form onSubmit={handleReport}>
              <textarea
                name="report"
                className="textarea textarea-error mt-5"
                placeholder="report now!"
              ></textarea>
              <br />
              <button className="text-white bg-red-500 rounded-lg py-2 px-4 my-5">
                Submit
              </button>
            </form>
          </div>
        </div>
        }
      </div>
      <div>
        <div className="max-w-20 w-96">
          <Chart
            className=" sm:w-auto md:w-auto"
            height={800}
            type="pie"
            series={chartData?.series}
            options={chartData?.options}
          />
        </div>
        {/* comment and reports */}
        <div className="lg:mt-20 shadow-xl  lg:w-[500px]  bg-base-100 ">
          <div className="border-2 border-red-500 p-5 rounded-lg">
            <h2 className="text-center text-xl font-bold">Report</h2>
            
            {allUserReport?.map((report) => (
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
            {userInfo?.map((report) => (
              <div key={_id}>
            
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
    </section>
  
  );
};

export default SurveyDetails;
