import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import routes from "../router/route";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function MyAllSwapRequestsPage() {
  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user == null) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate(routes.LoginPage);
    }
  }, [navigate, user]);

  return (
    <Container component="main" maxWidth="xs" style={{ textAlign: "center" }}>
      <Typography component="h2" variant="h5" gutterBottom>
        My All Swap Requests Page
      </Typography>
      <Button
        component={RouterLink}
        to={routes.IncomingSwapRequestsPage}
        variant="contained"
        color="primary"
        style={{ margin: "8px" }}
      >
        Incoming Swap Requests
      </Button>
      <Button
        component={RouterLink}
        to={routes.OutgoingSwapRequestsPage}
        variant="contained"
        color="success"
        style={{ margin: "8px" }}
      >
        Outgoing Swap Requests
      </Button>
    </Container>
  );
}

export default MyAllSwapRequestsPage;
