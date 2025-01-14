import { useQuery } from "@tanstack/react-query";
import Title from "../../components/Title/Title";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { LuUsersRound } from "react-icons/lu";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(users);
  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success(`${user.name} is an admin now!`);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
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
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
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
        <Title subTitle={"How Many???"} title={"Manage All Users"}></Title>
      </section>
      <section className="w-[80%] mx-auto bg-slate-100 shadow-lg py-14 px-12">
        <div>
          <h3 className="text-[32px] font-bold text-start">
            Total Users: {users.length}
          </h3>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-orange-300 text-white">
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th className="text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {isPending ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">
                      <span className="loading loading-dots loading-lg"></span>
                    </td>
                  </tr>
                ) : (
                  users.map((user, i) => (
                    <tr key={user._id}>
                      <th>{i + 1}</th>

                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user?.role === "admin" ? (
                          "Admin"
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="btn btn-xs bg-orange-300 text-white font-semibold"
                          >
                            <LuUsersRound />
                          </button>
                        )}
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="btn btn-xs btn-error"
                        >
                          Delete
                        </button>
                      </td>
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

export default AllUsers;
