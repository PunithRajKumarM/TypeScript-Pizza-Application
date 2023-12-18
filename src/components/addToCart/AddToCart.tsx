import React from "react";
import { CartItem, useStateDispatch } from "../appState/AppState";

export interface AddToCartProps {
  addToCart: (item: Omit<CartItem, "quantity">) => void;
}

export function withAddToCart<OriginalProps extends AddToCartProps>(
  ChildComponent: React.ComponentType<OriginalProps>
) {
  const AddToCartHOC = (props: Omit<OriginalProps, keyof AddToCartProps>) => {
    const dispatch = useStateDispatch();
    const handleAddToCartClick = <T extends CartItem>(
      item: Omit<T, "quantity">
    ) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          item,
        },
      });
    };
    return (
      <ChildComponent
        {...(props as OriginalProps)}
        addToCart={handleAddToCartClick}
      />
    );
  };
  return AddToCartHOC;
}

//Render props
export const WithAddToCartProps: React.FC<{
  children: (props: AddToCartProps) => JSX.Element;
}> = ({ children }) => {
  const dispatch = useStateDispatch();
  const addToCart = <T extends CartItem>(item: Omit<T, "quantity">) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item,
      },
    });
  };
  return children({ addToCart });
};

//custom Hooks
export const useAddToCart = () => {
  const dispatch = useStateDispatch();
  const addToCart = <T extends CartItem>(item: Omit<T, "quantity">) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        item,
      },
    });
  };
  return addToCart;
};
