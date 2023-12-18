import { useMutation, useQuery, useQueryClient } from "react-query";
import Service from "../service";

const useMeQuery = () => {
  return useQuery(["me"], Service.getAllUserDetails);
};

const useGetAllStores = (email) => {
  return useQuery(["allProducts"], Service.getAllStores);
};

const useLoginMutation = () => {
  return useMutation(Service.login, {
    onSuccess: (data) => {
      console.log("Login successful", data);
      return data;
    },
  });
};

export { useMeQuery, useGetAllStores, useLoginMutation };
