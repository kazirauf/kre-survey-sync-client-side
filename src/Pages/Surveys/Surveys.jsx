import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Link } from "react-router-dom";

const Surveys = () => {
  const axiosSecure = useAxiosSecure();
  const { data: surveyCreation = [] } = useQuery({
    queryKey: ["surveyCreation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/surveyCreation");
      return res.data;
    },
  });
  return (
  <div>
    <h1 className="text-center text-5xl mt-2 text-amber-500">All Survey</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-20 mx-10">
      {surveyCreation.map((card) => (
        <Link to={`/surveyDetails/${card._id}`} key={card} className="card w-72 h-60 bg-base-100 shadow-xl border-2 border-amber-500 rounded-xl">
          <div className="card-body">
            <h2 className="card-title">{card.survey_title}</h2>
            <p>{card.survey_description}</p>
            <p>total voted: 0</p>
       
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default Surveys;
