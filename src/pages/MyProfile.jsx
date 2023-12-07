import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import routes from "../router/route";

function MyProfile() {
  // const { user, setUser } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

  function checkLogin() {
    if (user == null) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate(routes.LoginPage);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="my-profile-page">
      <div className="person-details">
        <h2> {user.fname}'s Profile Page</h2>
        <div>
          <h6>ID : {user.id}</h6>
          <h6>First Name : {user.fname}</h6>
          <h6>Last Name : {user.lname}</h6>
          <h6>Email : {user.email}</h6>

          <Link
            to={routes.MyProducts}
            className="btn btn-primary"
            style={{ margin: "5px" }}
          >
            My Products
          </Link>

          <Link
            to={routes.TradeRequests}
            className="btn btn-success"
            style={{ margin: "5px" }}
          >
            My Swap Requests
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
