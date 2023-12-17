// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
// import StarRating from './StarRating'; // Assume you have a StarRating component

// Define your API endpoint
const API = "https://api.example.com/products";

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const ProductImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ReviewSection = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 20px;
`;

const ReviewHeader = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  margin-bottom: 15px;
`;

// Main component
const ReviewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   // Fetch product details from the API
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await fetch(`${API}/${id}`);
  //       const data = await response.json();
  //       setProduct(data);
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  return (
    <Container>
      {
        <>
          <ProductDetails>
            <ProductInfo>
              <ProductTitle>{"shalini"}</ProductTitle>
              <ProductDescription>{"good"}</ProductDescription>
            </ProductInfo>
            <ProductImage
              src={
                "https://blog.hubspot.com/hs-fs/hubfs/parts-url_1.webp?width=595&height=400&name=parts-url_1.webp"
              }
              alt={"shirt"}
            />
          </ProductDetails>
          <ReviewSection>
            <ReviewHeader>Customer Reviews</ReviewHeader>
            <ReviewList></ReviewList>
          </ReviewSection>
        </>
      }
    </Container>
  );
};

export default ReviewProduct;
// {product.reviews.map((review) => (
//   <ReviewItem key={review.id}>
//     <StarRating rating={review.rating} />
//     <p>{review.comment}</p>
//   </ReviewItem>
// ))}
