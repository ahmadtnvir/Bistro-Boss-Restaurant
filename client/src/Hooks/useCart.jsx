// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

// const useCart = () => {
//   // ! TanStack Query
//   const axiosSecure = useAxiosSecure();
//   const { data: cart = [] } = useQuery({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/carts");
//       return res.data;
//     },
//   });
//   //   return data;
//   return [cart];
// };

// export default useCart;

// const useCart = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data } = useQuery({
//     queryKey: ["cart"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/carts");
//       return res.data;
//     },
//   });
//   return data;
// };

// export default useCart;

// const useCart = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const { data: cart = [], refetch } = useQuery({
//     queryKey: ["cart", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/carts?email=${user?.email}`);
//       return res.data;
//     },
//   });
//   return [cart, refetch];
// };

// export default useCart;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: cart = [], refetch, isPending } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart, refetch, isPending];
};

export default useCart;
