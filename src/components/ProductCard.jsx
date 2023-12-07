import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const { id, name, description, imgUrl } = props;

  function handleClick(e) {
    console.log("More info wanted");
  }

  return (
    <div className="product-card">
      <img className="product-img" src={imgUrl} alt="Product pic" />
      <h5>{name}</h5>

      {id != -1 && (
        <Link className="btn btn-info" to={`/productInfo/${id}`}>
          Know more
        </Link>
      )}
      {/*       
      <button onClick={handleClick} className="btn btn-info">
        Know More
      </button> */}
    </div>
  );
}

export default ProductCard;
