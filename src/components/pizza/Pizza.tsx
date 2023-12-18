import React, { FC } from "react";
import PizzaCSS from "./Pizza.module.css";
import { useStateDispatch } from "../appState/AppState";
import { Pizza } from "../../types";
import {
  AddToCartProps,
  useAddToCart,
  withAddToCart,
} from "../addToCart/AddToCart";

interface Props {
  // extends AddToCartProps
  pizza: Pizza;
}

// function Pizza({ pizza }: Props): React.ReactElement {
//   return (
//     <li>
//       <h2>{pizza.name}</h2>
//       <p>{pizza.description}</p>
//       <p>{pizza.price}</p>
//     </li>
//   );
// }

//alternative
const PizzaItem: FC<Props> = ({
  pizza,
  // addToCart
}) => {
  // const dispatch = useStateDispatch();
  const addToCart = useAddToCart();
  const handleAddToCartClick = () => {
    addToCart({ id: pizza.id, name: pizza.name, price: pizza.price });
  };
  return (
    <li className={PizzaCSS.container}>
      <h2>{pizza.name}</h2>
      <p>{pizza.description}</p>
      <p>{pizza.price}</p>
      <button type="button" onClick={handleAddToCartClick}>
        Add to cart
      </button>
    </li>
  );
};

// export default withAddToCart(PizzaItem);
export default PizzaItem;
