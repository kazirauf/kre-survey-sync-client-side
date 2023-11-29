import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";


const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center">
            <span className="loading loading-spinner text-accent text-5xl font-bold w-32"></span>
        </div>
    }


    if (user) {
        return children;
    }

    return <Navigate  to="/login "></Navigate>;
};

export default PrivateRoute;