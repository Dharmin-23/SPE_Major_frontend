import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Paper, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { baseUrl } from "../utils/constants";

function AllProducts() {
  const [products, setProducts] = useState([]);

  async function getData() {
    const response = await axios.get(baseUrl + "/product/getProducts");
    setProducts(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ marginTop: 2 }}>
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        List of all available products
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {products.length > 0 ? (
            products.map((prod) => (
              <Grid item xs={12} md={4} key={prod.id}>
                <ProductCard
                  id={prod.id}
                  name={prod.name}
                  imgUrl={prod.imgLink}
                  description={prod.description}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" sx={{ marginY: 4 }}>
              There are no products currently available. Please add some products.
            </Typography>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default AllProducts;
