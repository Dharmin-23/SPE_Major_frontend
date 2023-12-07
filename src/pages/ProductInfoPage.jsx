import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfoCard from "../components/ProductInfoCard";
import { baseUrl } from "../utils/constants";

function ProductInfoPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    imgLink: "",
    user: {
      id: "",
      email: "",
      password: "",
      fname: "",
      lname: "",
    },
  });

  async function loadProducts() {
    const response = await axios.get(baseUrl + `/product/${id}`);
    setProduct(response.data);
    // console.log(response.data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="Product-info-page">
      <h3>{product.name} Details</h3>
      <ProductInfoCard
        id={product.id}
        name={product.name}
        imgLink={product.imgLink}
        description={product.description}
        owner={product.user.fname + " " + product.user.lname}
        ownerId={product.user.id}
      />
    </div>
  );
}

export default ProductInfoPage;
