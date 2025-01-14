import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const { user, setUser, setLoading, loginUser, googleLogin } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const captchaValue = watch("captcha");

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = () => {
    if (validateCaptcha(captchaValue)) {
      setIsCaptchaValid(true);
      toast.success("CAPTCHA validated successfully!");
    } else {
      setIsCaptchaValid(false);
      toast.error("CAPTCHA validation failed. Please try again.");
    }
  };

  const onSubmit = (data, e) => {
    // console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        setUser(result.user);
        setLoading(false);
        e.target.reset();
        // location?.state ? navigate(location.state) : navigate("/");
        navigate(from, { replace: true });
        toast.success("User logged in successfully!");
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
          name: result.user.displayName,
          email: result.user.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          setUser(result.user);
          setLoading(false);
          toast.success("User log in successfully!");
          location?.state ? navigate(location.state) : navigate("/");
        });
        // const user = result.user;
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="w-full lg:w-[80%] mx-auto my-12">
      <div className="hero bg-transparent min-h-screen">
        <div className="hero-content flex flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <Link to={"/"}>
              <span className="btn flex items-center w-fit gap-2">
                <FaRegArrowAltCircleLeft className="text-2xl" /> Back to Home
              </span>
            </Link>
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Login with your email and password. Validate the CAPTCHA before
              proceeding.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                    {...register("password", { required: true })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-ghost"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter Captcha"
                    className="input input-bordered flex-grow"
                    {...register("captcha", { required: true })}
                  />
                  <button
                    onClick={() => handleValidateCaptcha()}
                    type="button"
                    className="btn btn-outline btn-ghost"
                  >
                    Validate
                  </button>
                </div>
                {errors.captcha && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={!isCaptchaValid}>
                  Login
                </button>
              </div>
              <div>
                <p className="my-6">
                  Don't have an account?
                  <Link to={"/register"} className="link link-primary">
                    Sign Up
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

export default Login;
