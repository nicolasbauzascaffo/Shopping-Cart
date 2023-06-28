import React from "react";
import "../styles/home.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Home = ({ stateProducts, dispatch }) => {

  const addToCart = (id) => {
    dispatch({
      type: "addToCart",
      payload: id,
    });
  };


  return (
    <div className="home">
      <h1>Products:</h1>
      <section className="products-box">
        {stateProducts.products.map((product, index) => (
          <Card key={index} className="product-item" sx={{ maxWidth: 340 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="350"
              image={`../src/images/${product.id}.jpg`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography
                sx={{ fontSize: "11px" }}
                variant="body2"
                color="text.secondary"
              >
                {product.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
            </CardActions>
            <CardActions
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() => addToCart(product.id)}
                className="add-btn"
                size="small"
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Home;
