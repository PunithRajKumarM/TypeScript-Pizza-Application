import React from "react";
import pizzas from "../../data/pizzas.json";
import Pizza from "../pizza/Pizza";
import AppCSS from "./App.module.css";
import PizzaSVG from "../../svg/pizza.svg";
import Cart from "../cart/Cart";
import AppStateProvider from "../appState/AppState";
import SpecialOffer from "../specialOffer/SpecialOffer";

export default function App() {
  const specialOfferPizza = pizzas.find((pizza) => pizza.specialOffer);
  return (
    <AppStateProvider>
      <div className={AppCSS.container}>
        <div className={AppCSS.header}>
          <PizzaSVG width={120} height={120} />
          <h1 className={AppCSS.siteTitle}>Delicious pizza!</h1>
          <Cart />
        </div>
        {specialOfferPizza && <SpecialOffer pizza={specialOfferPizza} />}
        <ul className={AppCSS.pizzaList}>
          {pizzas.map((pizza) => {
            return <Pizza key={pizza.id} pizza={pizza} />;
          })}
        </ul>
      </div>
    </AppStateProvider>
  );
}
