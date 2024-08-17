import {useQuery} from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseProductsCount = () => {
  const axiosPublic = UseAxiosPublic();
  const {data: productsCount = []} = useQuery({
    queryKey: ["productsCount"],
    queryFn: async () => {
      const res = await axiosPublic.get("/totalProducts");
      return res.data;
    },
  });
  return [productsCount];
};

export default UseProductsCount;
