import React from "react";
import ProductCard from "./ProductCard";

function CreateSwapRequestCard(props) {
  const { product1, product2 } = props;

  return (
    <div className="swap-request-card">
      {/* Product 1 */}
      <div className="swap-request-element">
        <h5>Your Product</h5>
        <ProductCard
          id={product1.id}
          name={product1.name}
          imgUrl={product1.imgLink}
          description={product1.description}
        />
      </div>
      {/* Swap Image */}
      <div className="swap-request-element">
        <img
          src="https://icon-library.com/images/swap-icon/swap-icon-15.jpg"
          alt="Swap Symbol"
          style={{ height: "200px" }}
        />
      </div>
      {/* Product 2 */}
      <div className="swap-request-element">
        <h5>Swap with</h5>
        <ProductCard
          id={product2.id}
          name={product2.name}
          imgUrl={product2.imgLink}
          description={product2.description}
        />
      </div>
    </div>
  );
}

export default CreateSwapRequestCard;
