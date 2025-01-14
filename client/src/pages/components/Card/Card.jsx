import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";

const Card = ({ item }) => {
  //   console.log(item);
  const { name, recipe, image, _id, price } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [_, refetch] = useCart();

  const handleCartBtn = () => {
    // console.log(food, user?.email);
    if (user && user?.email) {
      // console.log(user?.email, food);
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure
        .post("/carts", cartItem)
        .then((res) => {
          // console.log(res.data);
          if (res.data.insertedId) {
            toast.success(`${name} added to your cart.`);
            refetch();
          }
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
        });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log In!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card bg-[#F3F3F3] shadow-xl">
      <figure>
        <img className="object-cover" src={image} alt="" />
      </figure>
      <div className="card-body flex flex-col justify-center items-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          {/* <button className="btn btn-primary">Add to Cart</button> */}

          <button className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
            <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span
              onClick={handleCartBtn}
              className="relative text-primary transition-colors duration-200 ease-in-out delay-100 group-hover:text-white"
            >
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
