import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  // const { user, setUser, setLoading, googleLogin, createUser, userUpdate } =
  //   useContext(AuthContext);
  const { user, setUser, setLoading, googleLogin, createUser, userUpdate } =
    useAuth();
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // ! Create user
    createUser(data.email, data.password)
      .then((result) => {
        // ! After created user update the user info
        userUpdate(data.name, data.photo).then(() => {
          setUser(result.user);
          setLoading(false);
          // !-----Set users information in the database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              // ! After added info to the database reset form , show success message and redirect user to the home page
              console.log("user added to the database");
              reset();
              toast.success("User created and updated successfully!");
              location?.state ? navigate(location.state) : navigate("/");
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const handleGoogleBtn = () => {
    googleLogin()
      .then((result) => {
        // console.log(result.user.displayName, result.user.photoURL);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          // console.log(res.data);
          setUser(result.user);
          setLoading(false);
          toast.success("User created and updated successfully!");
          location?.state ? navigate(location.state) : navigate("/");
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };
  return (
    <div className="w-full lg:w-[80%] mx-auto my-12">
      <div className="hero bg-transparent min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Login with your email and password. Validate the CAPTCHA before
              proceeding.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="url"
                  placeholder="photo"
                  className="input input-bordered"
                  {...register("photo", { required: true })}
                />
                {errors.photo && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex justify-between items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={showPassword ? "password" : "********"}
                    className="input input-bordered flex-grow"
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-ghost"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                {errors.password?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    Password must be at least 6 characters long and include at
                    least one uppercase and one lowercase letter.
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <div>
                <p className="my-6">
                  Already have an account?
                  <Link to={"/login"} className="link link-primary">
                    Sign In
                  </Link>
                </p>
              </div>
              <div
                onClick={handleGoogleBtn}
                className="btn btn-outline border-x-0 border-t-0 border-b-2"
              >
                <FcGoogle className="text-2xl" />
                Sign in with google.
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
