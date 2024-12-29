import { useContext } from "react";
import { SearchTextContext } from "../../context/SearchTextContextProvider";

export default function useSearchTextContext() {
  const context = useContext(SearchTextContext); 
   if (!context) {
     throw new Error(
       "useSearchTextContext must be used within SearchTextContextProvider"
     );
   }
 
   return context;
}
