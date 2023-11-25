import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import useAxiosPublic from "../../../hook/useAxiosPublic";


const SocalLogin = () => {
    const {signInWithProvider} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleSignInWithGoogle = () => {
        signInWithProvider()
        .then(result => {
            const user = result.user;
            const usersInfo = {
                name: user?.displayName,
                email: user?.email,
                image: user?.photoURL,
                role: "user",
              }
              axiosPublic.post('/users', usersInfo)
              .then(res => {
                 console.log(res.data);
             })
              navigate("/")
        })
    }
    return (
        <div>
               <button
          onClick={handleSignInWithGoogle}
          className="flex justify-center w-full mt-4 py-3 px-4 rounded-full bg-gradient-to-r from-lime-500 to-pink-200 text-white text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
           <img className="w-7" src="https://seeklogo.com/images/G/google-2015-logo-65BBD07B01-seeklogo.com.png" alt="" />
          </button>
        </div>
    );
};

export default SocalLogin;