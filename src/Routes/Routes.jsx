import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashboardLayout from "./DashboardLayout/DashboardLayout";
import SurveyCreation from "../Pages/Dashboard/SurveyCreation/SurveyCreation";
import Users from "../Pages/Dashboard/Users/Users";
import Pricing from "../Pages/Pricing/Pricing";
import SurveyStatus from "../Pages/Dashboard/SurveyStatus/SurveyStatus";
import FeedBack from "../Pages/Dashboard/SurveyStatus/FeedBack";
import Surveys from "../Pages/Surveys/Surveys";
import SurveyDetails from "../Pages/Surveys/SurveyDetails";
import UsersPayment from "../Pages/Dashboard/UsersPayment/UsersPayment";
import MySurvey from "../Pages/Dashboard/MySurvey/MySurvey";

import UpdateSurvey from "../Pages/Dashboard/MySurvey/UpdateSurvey";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import About from "../Pages/About/About";
import ContactUs from "../Pages/ContactUs/ContactUs";
import HelpCenter from "../Pages/HelpCenter/HelpCenter";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/pricing',
                element: <Pricing></Pricing>
            },
            {
                path: '/surveys',
                element: <Surveys></Surveys>
            },
            {
                path: '/surveyDetails/:id',
                element: <SurveyDetails></SurveyDetails>,
            },
            {
                path: '/about',
                element: <About></About>,
            },
            {
                path: '/contactUs',
                element: <ContactUs></ContactUs>,
               
            },
            {
                path: '/helpCenter',
                element: <HelpCenter></HelpCenter>,
               
            }
        
            
        ]
    },
    {
   path: 'dashboard',
   element: <DashboardLayout></DashboardLayout>,
   children: [ 
    {
        path: 'surveyCreation',
        element : <PrivateRoute><SurveyCreation></SurveyCreation></PrivateRoute>
    },
    {
        path: 'users',
        element: <Users></Users>
    },
    {
        path: 'surveyStatus',
        element:  <SurveyStatus></SurveyStatus>
    },
    {
        path: 'feedback/:id',
        element: <FeedBack></FeedBack>,
        loader: ({params}) => fetch(`https://kre-survey-server-side.vercel.app/surveyCreation/${params.id}`)
    },
    {
        path: 'usersPayment',
        element: <UsersPayment></UsersPayment>
       
    },
    {
        path: 'mySurvey',
        element: <PrivateRoute><MySurvey></MySurvey></PrivateRoute>
    },
    {
        path: 'update/:id',
        element:  <UpdateSurvey></UpdateSurvey>,
        loader: ({params}) => fetch(`https://kre-survey-server-side.vercel.app/surveyCreation/${params.id}`)
    }
    
   
   
   ]
    }
  
])