import React, { useContext, useEffect, useState } from "react";
import CreateSwapRequestCard from "../components/CreateSwapRequestCard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../router/route";
import { baseUrl } from "../utils/constants";

function CreateSwapRequestPage() {
  let navigate = useNavigate();

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

  // function setSwapRequestData() {
  //   setCreatedSwapRequest({
  //     status: "Pending",
  //     product1: {
  //       id: product1.id,
  //     },
  //     user1: {
  //       id: user.id,
  //     },
  //     product2: {
  //       id: product2.id,
  //     },
  //     user2: {
  //       id: product2.user.id,
  //     },
  //   });
  // }

  async function sendSwapRequest() {
    try {
      await axios.post(baseUrl + "/swapRequest/create", createdSwapRequest);
      alert("Request sent !!!.\nNavigating to your sent request page");
      navigate(routes.OutgoingSwapRequestsPage);
    } catch {
      alert("Something went wrong !!!. Please try again");
    }
  }

  function handleSubmit(e) {
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
    <div className="create-swap-request-page">
      {/* <h2>Create SwapRequest Page</h2> */}
      <div className="create-swap-request-card">
        <CreateSwapRequestCard product1={product1} product2={product2} />

        <div style={{ margin: "20px" }}>
          <h5>Choose one of your products to swap with :</h5>
          <select
            // value={emptyData}
            className="form-select"
            onChange={(e) => {
              let index = e.target.value;
              index >= 0
                ? setProduct1(myProducts[index])
                : setProduct1(emptyData);
            }}
          >
            <option value={-1}>{"None selected"}</option>
            {/* <option>"Non"</option> */}
            {myProducts.length > 0 ? (
              myProducts.map((product, index) => {
                return (
                  <option key={index} value={index}>
                    {product.name}
                  </option>
                );
              })
            ) : (
              <option value={-1}>
                {"You haven't added any products to your account"}
              </option>
            )}
          </select>
        </div>
        <button onClick={handleSubmit} className="btn btn-success">
          Send Request
        </button>
      </div>
    </div>
  );
}

export default CreateSwapRequestPage;
