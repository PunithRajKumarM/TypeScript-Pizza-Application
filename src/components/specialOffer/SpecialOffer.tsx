import React, { FC } from "react";
import { Pizza } from "../../types";
import { useStateDispatch } from "../appState/AppState";
import SpecialOfferCSS from "./SpecialOffer.module.css";
import {
  AddToCartProps,
  WithAddToCartProps,
  withAddToCart,
} from "../addToCart/AddToCart";

interface Props {
  pizza: Pizza;
}

const SpecialOffer: FC<Props> = ({
  pizza,
  // addToCart
}) => {
  // const handleAddToCartClick = () => {
  //   addToCart({ id: pizza.id, name: pizza.name, price: pizza.price });
  // };
  return (
    <div className={SpecialOfferCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <WithAddToCartProps>
        {({ addToCart }) => {
          return (
            <button
              type="button"
              onClick={() => {
                addToCart({
                  id: pizza.id,
                  name: pizza.name,
                  price: pizza.price,
                });
              }}
            >
              Add to cart
            </button>
          );
        }}
      </WithAddToCartProps>
    </div>
  );
};

export default SpecialOffer;
