import { useEffect, useState } from "react";
import { listOfCategories } from "../components/Category/ListOfCategories";

export const useCategory = () => {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    setCategoriesList(listOfCategories);
  }, []);

  return categoriesList;
};
