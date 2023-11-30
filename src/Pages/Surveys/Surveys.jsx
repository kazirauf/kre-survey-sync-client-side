import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { Link } from "react-router-dom";
import { useState } from "react";

const Surveys = () => {
  const axiosSecure = useAxiosSecure();
  const [surveyData, setSurveyData] = useState([]);
  const [asc, setAsc] = useState(false);
  const [reloaded, setReloaded] = useState(false);
  const { data: surveyCreation = [] } = useQuery({
    queryKey: ["surveyCreation"],
    queryFn: async () => {
      setReloaded(true);
      const res = await axiosSecure.get("/surveyCreation");
      return res.data;
    },
  });

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.target.value;
    console.log(form);
    if (form.length > 0) {
      const data = surveyCreation.filter((s) => s.survey_title.includes(form));
      setSurveyData(data);
      setReloaded(false);
    }
  };
  const handleCategory = (event) => {
    event.preventDefault();
    const form = event.target.value;
    console.log(form);
    const data = surveyCreation.filter((s) => s.survey_category === form);
    setSurveyData(data);
    setReloaded(false);
  };
  const handleButton = (event) => {
    event.preventDefault();
    const form = event.target.value;
    console.log(form);
   setAsc(!asc)
   if(asc){
    const data = surveyCreation.sort((a, b) => a.yes-b.yes)
    setSurveyData(data);
    setReloaded(false);
   }
   else{
    const data = surveyCreation.sort((a, b) => b.yes-a.yes)
    setSurveyData(data);
    setReloaded(false);
   }
  };

 
  return (
    <div>
   <div className="text-center ">
   <div className="join lg:mr-5 lg:ml-5 mt-5 mb-5">
        <input
          onChange={handleSearch}
          className="input input-bordered join-item"
          placeholder="Search Survey Title"
        />
        <button className="btn join-item rounded-r-full">Search</button>
      </div>
      <select
        onChange={handleCategory}
        className="w-[52] px-4 mb-5 py-2 border-2 rounded-xl border-lime-500 focus:outline-none focus:border-lime-400 focus:bg-white"
        name="survey_category"
      >
        <option value="Demographics">Demographics</option>
        <option value="Customer Satisfaction">Customer Satisfaction</option>
        <option value="Employee Engagement">Employee Engagement</option>
        <option value="Product Feedback">Product Feedback</option>
        <option value="Market Research">Market Research</option>
        <option value="Health and Wellness">Health and Wellness</option>
        <option value="Education">Education</option>
        <option value="Political Opinions">Political Opinions</option>
        <option value="Event Feedback">Event Feedback</option>
        <option value="Technology Usage">Technology Usage</option>
        <option value="Social Issues">Social Issues</option>
        <option value="Sports">Sports</option>
  <option value="Entertainment">Entertainment</option>
        <option value="Travel and Tourism">Travel and Tourism</option>
        <option value="Environmental Awareness">Environmental Awareness</option>
        <option value="Nonprofit and Charity">Nonprofit and Charity</option>
        <option value="Retail Experience">Retail Experience</option>
      </select>
      <button onClick={handleButton} className="btn bg-green-500 text-white ml-5">{!asc ? "No Voted": "Yes Voted"}</button>
   </div>
      <div>
        <h1 className="text-center text-5xl mt-2 text-amber-500">All Survey</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-20 lg:mx-10 ml-5">
          {reloaded
            ? surveyCreation.map((card) =>
                card.activity === "published" ? (
                  <Link
                    to={`/surveyDetails/${card._id}`}
                    key={card}
                    className="card w-72 max-h-96 bg-base-100 shadow-xl border-2 border-amber-500 rounded-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{card.survey_title}</h2>
                      <p>{card.survey_description}</p>
                      <p className="font-bold">total voted yes: {card.yes}</p>
                      <p className="font-bold">total voted no: {card.no}</p>
                     
                    </div>
                  </Link>
                ) : (
                  <Link
                    to={`/surveyDetails/${card._id}`}
                    key={card}
                    className="hidden card w-72 h-60 bg-base-100 shadow-xl border-2 border-amber-500 rounded-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{card.survey_title}</h2>
                      <p>{card.survey_description}</p>
                      <p className="font-bold">total voted yes: {card.yes}</p>
                      <p className="font-bold">total voted no: {card.no}</p>
                    
                    </div>
                  </Link>
                )
              )
            : surveyData.map((card) =>
                card.activity === "published" ? (
                  <Link
                    to={`/surveyDetails/${card._id}`}
                    key={card}
                    className="card w-72 h-60 bg-base-100 shadow-xl border-2 border-amber-500 rounded-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{card.survey_title}</h2>
                      <p>{card.survey_description}</p>
                      <p className="font-bold">total voted yes: {card.yes}</p>
                      <p className="font-bold">total voted no: {card.no}</p>
                     
                    </div>
                  </Link>
                ) : (
                  <Link
                    to={`/surveyDetails/${card._id}`}
                    key={card}
                    className="hidden card w-72 h-60 bg-base-100 shadow-xl border-2 border-amber-500 rounded-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{card.survey_title}</h2>
                      <p>{card.survey_description}</p>
                      <p className="font-bold">total voted yes: {card.yes}</p>
                      <p className="font-bold">total voted no: {card.no}</p>
                     
                    </div>
                  </Link>
                )
              )}
        </div>
      </div>
    </div>
  );
};

export default Surveys;
