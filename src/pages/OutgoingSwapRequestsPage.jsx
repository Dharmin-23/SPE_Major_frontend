import React, { useEffect, useState } from "react";
import SwapRequestCard from "../components/SwapRequestCard";
// import { staticSwapRequest } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";

function OutgoingSwapRequestsPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

  // const data = staticSwapRequest[0];
  // const requestList = staticSwapRequest;

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
    <div className="swap-request-page">
      <h2>Your SwapRequests</h2>

      {dataFromApi.length > 0 ? (
        dataFromApi.map((request) => {
          return (
            <SwapRequestCard
              key={request.id}
              id={request.id}
              product1={request.product1}
              product2={request.product2}
              status={request.status}
              deleteReq={deleteHandler}
              type="outgoing"
            />
          );
        })
      ) : (
        <h4 style={{ margin: "20px" }}>You have not sent any swap request</h4>
      )}
    </div>
  );
}

export default OutgoingSwapRequestsPage;
