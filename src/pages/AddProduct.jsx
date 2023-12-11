import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function AddProduct() {
  const user = JSON.parse(localStorage.getItem("user"));
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    imgLink: "",
    user: {
      id: user != null ? user.id : "",
    },
  });

  function checkLogin() {
    if (user == null) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate(routes.LoginPage);
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const isFormValid = Object.values(product).every((value) => value !== "");

    if (!isFormValid) {
      alert("Error !!!. Please fill out all fields");
    } else {
      try {
        await axios.post(baseUrl + "/product/add", product);
        alert(
          "Product added successfully \nRedirecting to My Products Page"
        );
        navigate(routes.MyProducts);
      } catch {
        alert("Error !!!. Invalid inputs");
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Fix IE 11 issue.
            marginTop: 3,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            type="text"
            id="description"
            autoComplete="description"
            value={product.description}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="imgLink"
            label="Image Link"
            type="text"
            id="imgLink"
            autoComplete="imgLink"
            value={product.imgLink}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddProduct;
