import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://khan-gadgets-db-sever.vercel.app",
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
