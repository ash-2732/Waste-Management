import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Auth";

function useWaste() {
  const [wasteReport, setWasteReport] = useState([]);
  const [auth] = useAuth();

  //get all waste reports
  const getWasteReports = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/reportWaste/getReports/${auth?.user?._id}`
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
    // eslint-disable-next-line
  }, []);
  return wasteReport;
}

export default useWaste;
