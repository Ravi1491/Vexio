import React, { useState, useEffect } from "react";
import "../css/ProductPage.css"; // Create a separate CSS file for styling

const ProductPage = () => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://vexio-production.up.railway.app/shopify/fetch-products?shop=xg-dev",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "access-control-allow-origin": "*",
            },
          }
        );

        const data = await response.json();
        console.log("PRODUCTS", data);

        setJsonData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-container">
      <h1>Product Page</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {jsonData ? (
            jsonData.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.variants[0].price}</td>
                <td>
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      className="product-image"
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
