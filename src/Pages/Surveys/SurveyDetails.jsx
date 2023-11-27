import { useLoaderData } from "react-router-dom";

const SurveyDetails = () => {
  const survey = useLoaderData();
  const {
    survey_title,
    timeStamp,
    survey_description,
    survey_category,
    user_email,
    like,
    disLike,
    yes,
    no,
  } = survey;

  return (
    <div>
      <div className="card w-96 lg:w-[600px] lg:ml-20 mt-20 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl">{survey_title}</h2>
          <br />
          <p>{survey_description}</p>
          <p className="font-bold text-amber-600 mt-5">{survey_category}</p>
          <p className="text-sky-600 font-bold">User Email: {user_email}</p>
          <div className="card-actions ">
            <span className="flex gap-x-3 border-2 border-green-500 p-2 rounded-lg">
              <img
              className="w-7 h-7"
                src="https://seeklogo.com/images/F/facebook-like-logo-32FAB6926D-seeklogo.com.png"
                alt=""
              />
              <span className="text-xl">{like}</span>
            </span>
            <span className="flex gap-x-3 border-2 border-green-500 p-2 rounded-lg">
              <img
              className="w-7 h-7"
                src="https://pngimg.com/uploads/dislike/dislike_PNG53.png"
                alt=""
              />
              <span className="text-xl">{disLike}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
