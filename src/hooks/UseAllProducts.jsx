import {useQuery} from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseAllProducts = () => {
  const axiosPublic = UseAxiosPublic();
  const {data: allProducts = []} = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allProducts");
      return res.data;
    },
  });
  return [allProducts];
};

export default UseAllProducts;
