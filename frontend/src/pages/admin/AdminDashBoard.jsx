import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashBoard() {
  const [wasteReport, setWasteReport] = useState([]);

  //get all waste reports
  const getWasteReports = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/reportWaste/getReports`
      );
      if (data?.success) {
        setWasteReport(data?.reports);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWasteReports();
  }, []);
  return (
    <Layout title={'AdminDashBoard-Waste-Management'}>
      <div className="p-3 max-w-5xl mx-auto">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Rewards
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
              </tr>
            </thead>
            <tbody>
              {wasteReport && wasteReport.length > 0 ? (
                wasteReport.map((item) => (
                  <tr key={item.id} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-600 whitespace-nowrap"
                    >
                      {item.location}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-600">{item.description}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          item.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">{item.rewardsPoint} Points</td>
                    <td className="px-6 py-4">
                      <img
                        src={item.imageUrls}
                        alt="Waste"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No waste reports available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashBoard;
