// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import StarRating from "../components/Star";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// import StarRating from './StarRating'; // Assume you have a StarRating component

// Define your API endpoint

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

// Main component
const ReviewProduct = () => {
  const { product, request_id } = useParams();

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // Fetch product details from the API
    const fetchProduct = async () => {
      try {
        const data = {
          productSlug: product,
        };

        const response = await fetch(
          `http://localhost:4000/shopify/fetch-product`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //   Add any additional headers if needed
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("ddddd", response);
        const result = await response.json();

        setProductData(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // <Alert severity="error">{error.message}</Alert>;
        // Handle the error as needed
      }
    };

    fetchProduct();
  }, [product]);
  const [currentRating, setCurrentRating] = useState(0);
  const handleRatingChange = (newRating) => {
    console.log("new", newRating);
    setCurrentRating(newRating);
    // Perform any additional actions when the rating changes
  };
  const [text, setText] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const submitHandler = async () => {
    console.log("values", text, currentRating, request_id);
    try {
      const data = {
        rating: currentRating,
        feedback: text,
        reviewRequestId: request_id,
      };

      const response = await fetch(
        `http://localhost:4000/reviews/accept-email-reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //   Add any additional headers if needed
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log("ddddd", response);
      const result = await response.json();
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(true);
      console.error("Error fetching data:", error.message);
    }
  };
  return (
    <Container>
      {isSubmitted ? (
        <>Submitted successfully</>
      ) : (
        <>
          <ProductDetails>
            <ProductInfo>
              <ProductTitle>
                {productData?.ProductTitle
                  ? productData.ProductTitle
                  : "The Ultimate Smartwatch!"}
              </ProductTitle>
              <Box sx={{ paddingRight: "24px" }}>
                <ProductDescription>
                  {
                    "Introducing our cutting-edge product: The Ultimate Smartwatch! Seamlessly combining style and functionality, it boasts a vibrant touchscreen, health tracking features, and a sleek design. Elevate your lifestyle with this must-have accessory."
                  }
                </ProductDescription>
              </Box>
            </ProductInfo>
            <ProductImage
              src={
                productData?.metadata.image.src ??
                "https://blog.hubspot.com/hs-fs/hubfs/parts-url_1.webp?width=595&height=400&name=parts-url_1.webp"
              }
              alt={"shirt"}
            />
          </ProductDetails>
          <StarRating
            rating={currentRating}
            onRatingChange={handleRatingChange}
          />
          <Box sx={{ py: "24px" }}>
            <TextField
              fullWidth
              multiline
              label="Comment"
              InputProps={{
                rows: 3,
              }}
              value={text}
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              color: "#ff4495",
              display: "flex",
              justifyContent: "flex-start",
              p: "24px",
            }}
          >
            <Button
              onClick={submitHandler}
              sx={{
                color: "white",
                background: "#ff4495",
                ":hover": {
                  background: "#ff4495",
                },
                borderRadius: "150px",
                p: "15px 30px",
              }}
            >
              Submit your review
            </Button>
          </Box>
        </>
      )}
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
