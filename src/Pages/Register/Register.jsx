import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hook/useAuth";
import useAxiosPublic from "../../hook/useAxiosPublic";
import SocalLogin from "../Shared/SocalLogin/SocalLogin";


const Register = () => {
    const { createUser} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
        const handleRegister = e => {
            e.preventDefault();
                 const form = new FormData(e.currentTarget)
                 const image = form.get('image')
                 const name = form.get('name')
                 const email = form.get('email')
                 const password = form.get('password')
                 console.log(name, email, password)
         
               const specialCharactersRegex = /[!@#\$%\^\&*\)\(+=._-]/g;
    
               if (password.length < 6) {
                   toast.error('Password should be at least 6 characters or longer',{
                    position: "top-center"
                   });
                   return;
               }
          
               else if (!/[A-Z]/.test(password)) {
                toast.error('Your password should have at least one upper case characters.',{
                    position: "top-center"
                   })
                   return;
               }
               else if (!specialCharactersRegex.test(password)) {
                toast.error("Your password must have a special character",{
                    position: "top-center"
                   });
                 return;
               }
               
               
               
                 createUser(email, password)
                 .then(result => {
                   const user = result.user;
                   console.log(user);
                   const users = {
                     name: name,
                     email: user?.email,
                     image: image,
                     role: "user",
                   }
                   console.log(users);
                   axiosPublic.post('/users', users)
                   .then(res => {
                      console.log(res.data);
                  })
                   navigate("/")
                 updateProfile(result.user, {
                     displayName: name, 
                     photoURL: image
                 })
                 .then( () => console.log('profile updated'))
                 .catch()
                   if(user){
                     return toast.success('create the user account is Successfully done.',{
                        position: "top-center"
                       })
                   }
                 
                 })
                 .catch(error => {
                   console.error(error)
                  
                 })
           }
    
    
        return (
            <div>
    
                  <div className="min-h-screen flex items-center justify-center bg-lime-100">
          <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
            <h1 className="text-center text-lime-700 font-semibold text-2xl">Register</h1>
            <form onSubmit={ handleRegister } className="mt-6">
             <div>
                <h1 className="font-bold mb-2 ml-1 text-lime-700">Image Url</h1>
             <input
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:border-lime-400 focus:bg-white"
                type="text"
                placeholder="your image url"
                name="image"
                required
              />
             </div>
             <div className="py-3">
                <h1 className="font-bold mb-2 ml-1 text-lime-700">Name</h1>
             <input
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:border-lime-400 focus:bg-white"
                type="text"
                placeholder="your name"
                name="name"
                required
              />
             </div>
             <div className="py-3">
                <h1 className="font-bold mb-2 ml-1 text-lime-700">Email</h1>
             <input
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:border-lime-400 focus:bg-white"
                type="email"
                placeholder="your email address"
                name="email"
                required
              />
             </div>
             <div className="py-3">
                <h1 className="font-bold mb-2 ml-1 text-lime-700">Password</h1>
             <input
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:border-lime-400 focus:bg-white"
                type="password"
                placeholder="your password"
                name="password"
                required
              />
             </div>
        
              <button
                className="w-full mt-4 py-3 px-4 rounded-full bg-gradient-to-r from-lime-500 to-pink-200 text-white text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
              >
                Register
              </button>
              <SocalLogin></SocalLogin>
          
            
            </form>
          </div>
        
        </div>
     
            </div>
        );
};

export default Register;