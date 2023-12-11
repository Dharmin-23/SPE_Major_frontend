import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import CreateSwapRequestCard from "../components/CreateSwapRequestCard";

function CreateSwapRequestPage() {
  const navigate = useNavigate();

  const emptyData = {
    id: -1,
    name: "None Selected",
    description: "None",
    imgLink: "https://cdn-icons-png.flaticon.com/512/1021/1021919.png",
    user: {
      id: -1,
    },
  };

  const { id: prdId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [myProducts, setMyProducts] = useState([]);
  const [product1, setProduct1] = useState(emptyData);
  const [product2, setProduct2] = useState({
    id: "",
    name: "",
    description: "",
    imgLink: "",
    user: {
      id: "",
    },
  });

  async function loadProductById(prdId) {
    const response = await axios.get(baseUrl + `/product/${prdId}`);
    setProduct2(response.data);
    return response.data;
  }

  async function loadMyProducts() {
    const response = await axios.get(baseUrl + `/product/user/${user.id}`);
    setMyProducts(response.data);
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("Please login first !!! \nRedirecting to Login Page");
      navigate(routes.LoginPage);
    } else {
      loadMyProducts();
    }
  }, []);

  useEffect(() => {
    loadProductById(prdId);
  }, []);

  const [createdSwapRequest, setCreatedSwapRequest] = useState({
    status: "Pending",
    product1: {
      id: product1.id,
    },
    user1: {
      id: user.id,
    },
    product2: {
      id: product2.id,
    },
    user2: {
      id: product2.user.id,
    },
  });

  async function sendSwapRequest() {
    try {
      await axios.post(baseUrl + "/swapRequest/create", createdSwapRequest);
      alert("Request sent !!!.\nNavigating to your sent request page");
      navigate(routes.OutgoingSwapRequestsPage);
    } catch {
      alert("Something went wrong !!!. Please try again");
    }
  }

  function handleSubmit() {
    if (product1.id < 0) alert("Please select a product to exchange");
    else {
      setCreatedSwapRequest({
        status: "Pending",
        product1: {
          id: product1.id,
        },
        user1: {
          id: user.id,
        },
        product2: {
          id: product2.id,
        },
        user2: {
          id: product2.user.id,
        },
      });

      console.log("Created data");
      console.log(createdSwapRequest);
      sendSwapRequest();
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h2" sx={{ marginBottom: 2 }}>
        Create SwapRequest Page
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <CreateSwapRequestCard product1={product1} product2={product2} />

        <div style={{ margin: "20px" }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="product-select">Choose one of your products to swap with:</InputLabel>
            <Select
              value={myProducts.findIndex((prod) => prod.id === product1.id)}
              onChange={(e) => {
                const index = e.target.value;
                index >= 0 ? setProduct1(myProducts[index]) : setProduct1(emptyData);
              }}
              label="Choose one of your products to swap with"
              inputProps={{
                name: "product",
                id: "product-select",
              }}
            >
              <MenuItem value={-1} disabled>
                {"None selected"}
              </MenuItem>
              {myProducts.length > 0 ? (
                myProducts.map((product, index) => (
                  <MenuItem key={index} value={index}>
                    {product.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={-1} disabled>
                  {"You haven't added any products to your account"}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </Paper>

      <Button onClick={handleSubmit} variant="contained" color="success">
        Send Request
      </Button>
    </Container>
  );
}

export default CreateSwapRequestPage;
