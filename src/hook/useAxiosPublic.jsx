import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://kre-survey-server-side.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;