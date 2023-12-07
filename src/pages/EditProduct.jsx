import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import routes from "../router/route";
import axios from "axios";
import { baseUrl } from "../utils/constants";

function EditProduct() {
  const user = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    imgLink: "",
    user: {
      id: "",
    },
  });

  function checkLogin() {
    if (user == null) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate(routes.LoginPage);
    }
  }

  useEffect(() => {
    // checklogin();
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await axios.get(baseUrl + `/product/${id}`);
    setProduct(response.data);
    // console.log(response.data);
  }

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (user == null) {
      checkLogin();
      return;
    }
    await axios.put(baseUrl + `/product/update/${id}`, product);
    alert("Product modified successfully \nRedirecting to Products Info Page");
    navigate(`/productInfo/${product.id}`);
    // navigate(routes.ProductInfo);
  }

  return (
    <div className="Add-product-page">
      <div className="form-box">
        <h2>Edit Product Details</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name of the product"
            value={product.name}
            onChange={handleChange}
          />

          <label>Description</label>
          <input
            type="textBox"
            name="description"
            placeholder="Describe your product"
            value={product.description}
            onChange={handleChange}
          />

          <label>Image Link</label>
          <input
            type="text"
            name="imgLink"
            placeholder="Link to image of product"
            value={product.imgLink}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
