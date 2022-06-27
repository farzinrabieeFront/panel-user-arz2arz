import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    // console.log(location.pathname, "withRouter");
    console.log('-------------------', location);
    return (
      <Component
        Navigate={navigate}
        Location={location}
        Params={params}
        {...props}
      />
    );
  };

  return Wrapper;
};
