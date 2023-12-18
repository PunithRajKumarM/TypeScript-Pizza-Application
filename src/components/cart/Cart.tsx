import React, { createRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartCSS from "./Cart.module.css";
import { AppStateContext } from "../appState/AppState";

interface Props {}

interface State {
  isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
  #containerRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.#containerRef = createRef();
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
    if ((e.target as HTMLElement).nodeName === "SPAN") {
      e.target as HTMLSpanElement;
    }
    this.setState((pre) => ({ isOpen: !pre.isOpen }));
  };

  handleOutsideClick = (e: MouseEvent) => {
    if (
      this.#containerRef.current &&
      !this.#containerRef.current.contains(e.target as Node)
    ) {
      this.setState({ isOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  render() {
    return (
      <AppStateContext.Consumer>
        {(state) => {
          const itemsCount = state.cart.items.reduce((sum, item) => {
            return sum + item.quantity;
          }, 0);
          return (
            <div className={CartCSS.cartContainer} ref={this.#containerRef}>
              <button
                className={CartCSS.button}
                type="button"
                onClick={this.handleClick}
              >
                <FiShoppingCart />
                <span> {itemsCount} pizza(s)</span>
              </button>
              <div
                style={{ display: this.state.isOpen ? "block" : "none" }}
                className={CartCSS.cartDropDown}
              >
                <ul>
                  {state.cart.items.map((item) => {
                    return (
                      <li key={item.id}>
                        {item.name} &times; {item.quantity}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}

export default Cart;
