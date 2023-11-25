import { useState } from "react";
import useAuth from "../../../hook/useAuth";



const SurveyCreation = () => {
    const {user} = useAuth()
    const [options, setOptions] = useState({})
 
    
const addSurvey = (event) => {
    let like = 0;
    let disLike = 0;
    event.preventDefault()
    const form = event.target;
    const survey_title = form.survey_title.value;
    const survey_description = form.survey_description.value;
    const survey_category = form.survey_category.value;
    const user_email = user?.email;
   
    const survey = {survey_title, survey_description, survey_category, user_email, options, like, disLike}
    console.log(survey);
}


    return (
        <div>
          <div className="hero min-h-screen">
  <div className="hero-content ">

    <div className="card shrink-0 w-[1000px] max-w-2xl shadow-2xl bg-base-100">
      <form onSubmit={addSurvey} className="card-body ">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Survey Title</span>
          </label>
          <input type="text" name="survey_title" placeholder="Survey Title" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Survey Description</span>
          </label>
          <textarea name="survey_description" className="textarea textarea-success" placeholder="Survey Description"></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Survey Category</span>
          </label>
          <select className="w-full px-4 py-2 border-2 rounded-xl border-lime-500 focus:outline-none focus:border-lime-400 focus:bg-white"
                  name="survey_category">
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
  <option value="Travel and Tourism">Travel and Tourism</option>
  <option value="Environmental Awareness">Environmental Awareness</option>
  <option value="Nonprofit and Charity">Nonprofit and Charity</option>
  <option value="Retail Experience">Retail Experience</option>
</select>

        </div>
    <button className="py-2.5 px-5 rounded-md font-bold bg-gradient-to-r from-green-500 to-lime-500 text-white">Submit</button>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default SurveyCreation;