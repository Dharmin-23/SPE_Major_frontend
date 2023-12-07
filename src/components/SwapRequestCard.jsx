import React from "react";
import ProductCard from "./ProductCard";

function SwapRequestCard(props) {
  const {
    id,
    acceptReq,
    declineReq,
    deleteReq,
    status,
    product1,
    product2,
    type,
  } = props;

  return (
    <div className="swap-request-card">
      <div className="swap-request-element">
        <h4>Your product</h4>
        <ProductCard
          id={product1.id}
          name={product1.name}
          imgUrl={product1.imgLink}
          description={product1.description}
        />
      </div>
      <div className="swap-request-element">
        <img
          src="https://icon-library.com/images/swap-icon/swap-icon-15.jpg"
          alt="Swap Symbol"
          style={{ height: "200px" }}
        />
      </div>
      <div className="swap-request-element">
        <h4>Swap with</h4>
        <ProductCard
          id={product2.id}
          name={product2.name}
          imgUrl={product2.imgLink}
          description={product2.description}
        />
      </div>
      {type === "incoming" ? (
        <div className="swap-request-element actions-box">
          <p>Status :- {status}</p>
          <button className="btn btn-success" onClick={() => acceptReq(id)}>
            {" "}
            Accept
          </button>
          <button className="btn btn-warning" onClick={() => declineReq(id)}>
            {" "}
            Decline
          </button>
          <button className="btn btn-danger" onClick={() => deleteReq(id)}>
            {" "}
            Delete
          </button>
        </div>
      ) : (
        <div className="swap-request-element actions-box">
          <p>Status :- {status}</p>
          <button className="btn btn-danger" onClick={() => deleteReq(id)}>
            {" "}
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default SwapRequestCard;
