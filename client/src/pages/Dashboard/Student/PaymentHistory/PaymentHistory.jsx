import { useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Loader";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["paymentHistory"],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payment-history?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(paymentHistory);
  return (
    <>
      <Helmet>
        <title>Soul Sync | Payment History</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-white dark:text-gray-700 text-center py-5">
        Payment History
      </h2>
      <div className="bg-[#f7f7f7] dark:bg-white dark:shadow-md max-w-6xl mx-auto p-10 rounded-md">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#1D0E15] dark:bg-gray-700 rounded-xl text-white">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Transaction ID</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {paymentHistory.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td>{payment.email}</td>
                  <td>{payment.transactionId}</td>
                  <td>${payment.price}</td>
                  <td>{payment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentHistory;
