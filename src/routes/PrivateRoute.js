import { useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { cookieServices } from "../services";

const PrivateRoute = ({ component: Component, exact, path, ...rest }) => {
  const { customer, customerIdentity } = useSelector((state) => state.user);
  const { isVerified } = customer;
  let isverify = false;

  if (customerIdentity) {
    const { verified = "", verifyRequest = false } = customerIdentity || {};
    isverify = isVerified || (verifyRequest && verified !== "approved");
  }

  const access_token = cookieServices.get("accessToken");
  const refresh_token = cookieServices.get("refreshToken");

  const isAuth = access_token && refresh_token;

  let location = useLocation();
  const navigate = useNavigate();
  let params = useParams();

  return isAuth ? (
    location.pathname.includes("authentication") && isverify ? (
      <Navigate to="/" />
    ) : (
      <Component {...{ location, navigate, params }} {...rest} />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
