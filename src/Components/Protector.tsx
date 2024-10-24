import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { Navigate } from "react-router-dom";

const Protector = ({ children }:{children:any}) => {
  const { _id } = useSelector((state: RootState) => state.Dashboard);
  return <div>{_id === "" ? children : <Navigate to="/Dashboard" />}</div>;
};

export default Protector;
