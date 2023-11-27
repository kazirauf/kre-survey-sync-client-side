import { Navigate, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const FeedBack = () => {
  const data = useLoaderData();
  console.log(data);
  const { _id } = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleUnPublish = (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback.value;

    const newInfo = {
      activity: "unpublished",
      feedback: feedback,
    };

    console.log(newInfo);
    axiosSecure.put(`/surveyCreation/Unpublish/${_id}`, newInfo).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `the feedback completed`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/surveyStatus')
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleUnPublish}>
        <h3 className="font-bold text-lg mb-5">Give a feedback message</h3>
        <textarea
          name="feedback"
          className="textarea textarea-accent w-60"
          placeholder="feedback
message"
        ></textarea>

        <input
          type="submit"
          className="btn text-white bg-green-500 ml-5 mb-10"
          value="FeedBack Is Ok"
        />
      </form>
    </div>
  );
};

export default FeedBack;
