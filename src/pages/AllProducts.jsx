import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl, imgUrls } from "../utils/constants";
import ProductCard from "../components/ProductCard";

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
    <>
      <h2>List of all available products</h2>
      <div className="All-products-page">
        {products.length > 0 ? (
          products.map((prod) => {
            return (
              <ProductCard
                key={prod.id}
                id={prod.id}
                name={prod.name}
                imgUrl={prod.imgLink}
                description={prod.description}
              />
            );
          })
        ) : (
          <h5 style={{ margin: "20px" }}>
            There is no products Currently available. Please add some products.
          </h5>
        )}
      </div>
    </>
  );
}

export default AllProducts;
