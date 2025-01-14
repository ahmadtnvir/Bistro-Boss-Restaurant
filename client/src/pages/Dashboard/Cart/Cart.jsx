import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import Title from "../../components/Title/Title";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Cart = () => {
  const [cart, refetch, isPending] = useCart();

  const totalPrice = parseFloat(
    cart.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)
  );
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/carts/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
            toast.error(err.message);
          });
      }
    });
  };
  return (
    <div>
      <section className="mt-[50px] mb-16">
        <Title subTitle={"My Cart"} title={"WANNA ADD MORE?"}></Title>
      </section>
      <section className="w-[80%] mx-auto bg-slate-100 shadow-lg py-14 px-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-[32px] font-bold">Total Order: {cart.length}</h3>
          <h3 className="text-[32px] font-bold">Total Price: ${totalPrice}</h3>
          <button className="btn bg-orange-300 text-white font-bold text-xl">
            PAY
          </button>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-orange-300 text-white">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isPending ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-xl font-bold py-6"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : (
                  cart.map((item, i) => (
                    <tr key={item._id}>
                      <th>{i + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt="" />
                          </div>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <th>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
