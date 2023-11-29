import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const UsersPayment = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      const filteredUsers = res.data.filter((item) => item.role === "pro user");
      return filteredUsers;
    },
  });

  return (
    <div>

      <div className="mt-20">
        <h1 className="text-4xl  text-center mb-10">Pro User Payments</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-sky-500 text-white text-base rounded-xl">
              <tr>
                <th>Users</th>
                <th>Email</th>

                <th>User Role</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((u) => (
                <tr key={u._id} className="">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={u.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{u.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {" "}
                      {u.email}
                    </span>
                  </td>
                  <td>
                    <h2 className="text-base font-bold"> {u.role}</h2>
                  </td>
                  <td className="ml-20">${u.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPayment;
