import React, { useEffect, useState } from "react";
import SwapRequestCard from "../components/SwapRequestCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function OutgoingSwapRequestsPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();

  const [dataFromApi, setDataFromApi] = useState([]);

  async function deleteHandler(requestId) {
    await axios.delete(baseUrl + `/swapRequest/delete/${requestId}`);
    alert("Deleted !!!");
    navigate(routes.OutgoingSwapRequestsPage);
  }

  async function getData() {
    const response = await axios.get(
      baseUrl + `/swapRequest/getAllSwapRequestsByUser1/${user.id}`
    );
    setDataFromApi(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Your Swap Requests
      </Typography>

      {dataFromApi.length > 0 ? (
        dataFromApi.map((request) => (
          <SwapRequestCard
            key={request.id}
            id={request.id}
            product1={request.product1}
            product2={request.product2}
            status={request.status}
            deleteReq={deleteHandler}
            type="outgoing"
          />
        ))
      ) : (
        <Typography variant="h6" style={{ margin: "20px" }}>
          You have not sent any swap request.
        </Typography>
      )}
    </Container>
  );
}

export default OutgoingSwapRequestsPage;
