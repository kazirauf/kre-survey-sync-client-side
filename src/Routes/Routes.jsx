import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import DashboardLayout from "./DashboardLayout/DashboardLayout";
import SurveyCreation from "../Pages/Dashboard/SurveyCreation/SurveyCreation";
import Users from "../Pages/Dashboard/Users/Users";
import Pricing from "../Pages/Pricing/Pricing";



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
            }
            
        ]
    },
    {
   path: 'dashboard',
   element: <DashboardLayout></DashboardLayout>,
   children: [ 
    {
        path: 'surveyCreation',
        element : <SurveyCreation></SurveyCreation>
    },
    {
        path: 'users',
        element: <Users></Users>
    }
   ]
    }
  
])