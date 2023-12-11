import React, { useEffect, useState } from "react";
import SwapRequestCard from "../components/SwapRequestCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

function IncomingSwapRequestsPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();

  const [dataFromApi, setDataFromApi] = useState([]);

  async function acceptHandler(requestId) {
    await axios.put(baseUrl + `/swapRequest/${requestId}/accept`);
    alert("Accepted !!!\nRedirecting to My Products page");
    navigate(routes.MyProducts);
  }

  async function declineHandler(requestId) {
    await axios.put(baseUrl + `/swapRequest/${requestId}/decline`);
    alert("Decline !!!");
    navigate(routes.IncomingSwapRequestsPage);
  }

  async function deleteHandler(requestId) {
    await axios.delete(baseUrl + `/swapRequest/delete/${requestId}`);
    alert("Deleted !!!");
    navigate(routes.IncomingSwapRequestsPage);
  }

  async function getData() {
    const response = await axios.get(
      baseUrl + `/swapRequest/getAllSwapRequestsByUser2/${user.id}`
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
            product1={request.product2}
            product2={request.product1}
            status={request.status}
            type="incoming"
            acceptReq={acceptHandler}
            declineReq={declineHandler}
            deleteReq={deleteHandler}
          />
        ))
      ) : (
        <Typography variant="h6" style={{ margin: "20px" }}>
          Currently, there are no swap requests for you.
        </Typography>
      )}
    </Container>
  );
}

export default IncomingSwapRequestsPage;
