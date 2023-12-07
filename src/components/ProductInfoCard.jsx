import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import routes from "../router/route";
import axios from "axios";
import { baseUrl } from "../utils/constants";

function ProductInfoCard(props) {
  let navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const { id, imgLink, name, description, owner, ownerId } = props;

  async function deletePrd(prdId) {
    await axios.delete(baseUrl+`/product/delete/${prdId}`);
    alert(
      "Product deteted succussfully !!!.\nRedirecting to My Products page."
    );
    setShowConfirm(false);
    navigate(routes.MyProducts);
  }

  return (
    <div className="product-info-card">
      <div className="product-details">
        <a href={imgLink} target="blank">
          <img className="product-img" src={imgLink} alt="Product pic" />
        </a>
      </div>
      <div className="product-details">
        <h5>Product Id : {id}</h5>
        <h4>Name : {name}</h4>
        <h5>Owner : {owner}</h5>
        <h6>Description : {description}</h6>

        {user == null && (
          <Link
            to={routes.LoginPage}
            className="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Login to Swap
          </Link>
        )}

        {user != null && user.id !== ownerId && (
          <Link
            to={`/createSwapRequestPage/${id}`}
            className="btn btn-primary"
            style={{ margin: "5px" }}
          >
            Request Swap
          </Link>
        )}

        {user != null && user.id === ownerId && (
          <Link
            to={`/editProduct/${id}`}
            className="btn btn-warning"
            style={{ margin: "5px" }}
          >
            Update Product
          </Link>
        )}

        {user != null && user.id === ownerId && (
          <button
            onClick={() => {
              // console.log("deleted");
              setShowConfirm(true);
            }}
            className="btn btn-danger"
            style={{ margin: "5px" }}
          >
            Delete Product
          </button>
        )}

        {showConfirm && (
          <div>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={() => deletePrd(id)}>Yes</button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInfoCard;
