import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "@mui/material/Container";
import "../styles/navbar.css";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

function ResponsiveAppBar({ stateProducts, dispatch }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const clearProducts = () => {
    dispatch({
      type: "clearCart",
    });
  };

  const deleteProduct = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
  };

  const increseQuantity = (id) => {
    dispatch({
      type: "increse-quantity-cart",
      payload: id,
    });
  };

  const decreceQuantity = (id) => {
    dispatch({
      type: "decrese-quantity-cart",
      payload: id,
    });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3>Shopping Cart</h3>
      </List>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2px",
        }}
      >
        <DeleteForeverIcon
          sx={{ color: "red", cursor: "pointer" }}
          onClick={clearProducts}
        />
        Clear Cart
      </section>
      <Divider />
      <List sx={{ padding: "7px" }}>
        {stateProducts.cart.length > 0 ? (
          stateProducts.cart.map((product, index) => (
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                border: "solid 1px grey",
                borderRadius: "5px",
                margin: "2px",
              }}
              key={index}
            >
              <section
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4>{product.name}</h4>
                <DeleteIcon
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteProduct(product.id)}
                />
              </section>
              <h6>
                Total: U$S {(product.quantity * product.price).toFixed(2)}
              </h6>

              <section
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <button
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "green",
                    border: "none",
                    borderRadius: "5px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => decreceQuantity(product.id)}
                >
                  -
                </button>
                <h5>Quantity {product.quantity}</h5>
                <button
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "green",
                    border: "none",
                    borderRadius: "5px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => increseQuantity(product.id)}
                >
                  +
                </button>
              </section>
            </section>
          ))
        ) : (
          <section
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>The Cart is empty</p>
            <RemoveShoppingCartIcon />
          </section>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar className="navbar" position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <ShoppingCartIcon />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
