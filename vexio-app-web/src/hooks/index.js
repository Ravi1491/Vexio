import { useQuery } from "react-query";
import Service from "../service";

const useMeQuery = () => {
  return useQuery(["me"], Service.getAllUserDetails);
};

const useGetAllStores = (email) => {
  return useQuery(["allProducts"], Service.getAllStores);
};

export { useMeQuery, useGetAllStores };
