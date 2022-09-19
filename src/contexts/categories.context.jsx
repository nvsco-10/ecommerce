import { createContext, useState, useEffect } from 'react';

import { getCategoriesandDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoriesContext = createContext({
  categories: [],
})

export const CategoriesProvider = ({ children }) => {
  const [ categoriesMap, setCategoriesMap ] = useState({});
  const value = { categoriesMap };

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesandDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, [])

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}