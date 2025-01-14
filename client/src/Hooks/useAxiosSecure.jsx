import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// ! Step: 1 -> Create Axios Instance:
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

// ! Step: 2 ->
/**
 * Attach Interceptors:

    Request Interceptor:

    Before every request is sent, the interceptor is triggered.
    The interceptor retrieves an access token stored in localStorage (likely set after user authentication).
    This token is added to the request's headers under the Authorization field in the format Bearer <token>.
    Error Handling:

    If there’s an error during request preparation, it rejects the promise, allowing the calling function to handle it.
 * */
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  async function handleErrorResponse(status) {
    if (status >= 400 && status < 500) {
      if (status === 401) {
        toast.error("Unauthorized: Please log in.");
        await logoutUser();
        navigate("/login");
      } else if (status === 403) {
        toast.error("Forbidden: You don't have permission.");
      } else if (status === 404) {
        toast.error("Not Found: Resource does not exist.");
      } else {
        toast.error("Client error occurred");
      }
    } else if (status >= 500) {
      toast.error("Server error occurred. Please try again later.");
    } else {
      toast.error("Unknown error occurred.");
    }
  }

  /**
   * Response interceptor
      in Axios allows you to intercept and handle responses before they reach the calling code. This is useful for tasks like:

      Global Error Handling: Catch and handle errors (e.g., 401 Unauthorized, 500 Server Error) consistently across the app.
      Modify Responses: Transform or filter the data before sending it to the components.
      Refreshing Tokens: Automatically refresh expired tokens and retry the original request.
  * */
  axiosSecure.interceptors.response.use(
    function (response) {
      // Success: Pass the response data as is
      return response;
    },
    function (error) {
      // Error: Handle specific errors
      const status = error.response?.status;
      if (status) {
        handleErrorResponse(status);
      } else {
        toast.error("Network error: Please check your internet connection.");
      }
      return Promise.reject(error);
    }
  );

  // ! Final Step -> Return Axios Instance:
  return axiosSecure;
};

export default useAxiosSecure;
