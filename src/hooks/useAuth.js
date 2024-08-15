import {useContext} from "react";
import {AuthContext} from "../FirebaseProvider/AuthProvider";

const useAuth = () => {
  const hook = useContext(AuthContext);
  return hook;
};

export default useAuth;
