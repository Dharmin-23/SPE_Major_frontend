import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import routes from "../router/route";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import {
  Container,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";

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
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="Add-product-page">
        <div className="form-box">
          <Typography variant="h5">Edit Product Details</Typography>
          <form className="add-product-form" onSubmit={handleSubmit}>
            <TextField
              label="Name"
              type="text"
              name="name"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter name of the product"
              value={product.name}
              onChange={handleChange}
            />

            <TextField
              label="Description"
              type="text"
              name="description"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Describe your product"
              value={product.description}
              onChange={handleChange}
            />

            <TextField
              label="Image Link"
              type="text"
              name="imgLink"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Link to image of product"
              value={product.imgLink}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              style={{ marginTop: "16px" }}
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default EditProduct;
