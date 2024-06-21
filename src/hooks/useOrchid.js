import { useEffect, useState } from "react";
import { getAllOrchids } from "../api/OrchidsAPI";

export const useOrchid = () => {
  const [orchidList, setOrchidList] = useState([]);
  useEffect(() => {
    getAllOrchids()
      .then((data) => setOrchidList(data))
      .catch((err) => console.error(err));
  }, []);
  return orchidList;
};
