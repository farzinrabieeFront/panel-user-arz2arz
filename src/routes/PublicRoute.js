import React from "react";
import {
  Route,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { cookieServices } from "../services";

// restricted = false meaning public route
// restricted = true meaning restricted route

const PublicRoute = ({
  component: Component,
  restricted,
  exact,
  path,
  home,
  ...rest
}) => {
  const access_token = cookieServices.get("accessToken");
  const refresh_token = cookieServices.get("refreshToken");

  const isAuth = access_token && refresh_token;

  let location = useLocation();
  const navigate = useNavigate();
  let params = useParams();

  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <Component {...{ location, navigate, params }} {...rest} />
  );
};

export default PublicRoute;
