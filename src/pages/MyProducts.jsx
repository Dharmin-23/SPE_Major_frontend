import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../contexts/UserContext";
import routes from "../router/route";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { baseUrl, imgUrls } from "../utils/constants";

function MyProducts() {
  let navigate = useNavigate();

  // const { user, setUser } = useContext(UserContext);
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
      navigate(routes.LoginPage);
    } else {
      getData();
      // console.log(products);
    }
  }, []);

  return (
    <div>
      <h2>My Products</h2>

      <div className="My-products-page">
        {products.length > 0 ? (
          products.map((prod) => {
            return (
              <ProductCard
                key={prod.id}
                id={prod.id}
                name={prod.name}
                imgUrl={prod.imgLink}
                description={prod.description}
                owner={prod.user.fname}
              />
            );
          })
        ) : (
          <h5 style={{ margin: "20px" }}>
            You have not added any products. Please add some products.
          </h5>
        )}
      </div>
    </div>
  );
}

export default MyProducts;
