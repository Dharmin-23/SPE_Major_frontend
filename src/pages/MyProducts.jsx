import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { baseUrl } from "../utils/constants";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MyProducts() {
  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  let id;

  if (user != null) id = user.id;

  const [products, setProducts] = useState([]);

  async function getData() {
    const response = await axios.get(baseUrl + `/product/user/${id}`);
    setProducts(response.data);
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate("/login");
    } else {
      getData();
    }
  }, [navigate]);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        My Products
      </Typography>

      <Grid container spacing={3}>
        {products.length > 0 ? (
          products.map((prod) => (
            <Grid item key={prod.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                id={prod.id}
                name={prod.name}
                imgUrl={prod.imgLink}
                description={prod.description}
                owner={prod.user.fname}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" style={{ margin: "20px" }}>
            You have not added any products. Please add some products.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default MyProducts;
