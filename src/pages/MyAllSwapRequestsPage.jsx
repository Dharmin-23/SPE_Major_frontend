import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import routes from "../router/route";

function MyAllSwapRequestsPage() {
  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user == null) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate(routes.LoginPage);
    }
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h2>MyAllSwapRequestsPage</h2>
      <Link className="btn btn-primary" to={routes.IncomingSwapRequestsPage}>
        IncomingSwapRequests
      </Link>
      <br />
      <br />
      <Link className="btn btn-success" to={routes.OutgoingSwapRequestsPage}>
        OutgoingSwapRequests
      </Link>
    </div>
  );
}

export default MyAllSwapRequestsPage;
