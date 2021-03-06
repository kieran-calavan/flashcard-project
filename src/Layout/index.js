import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Components/Home"
import Study from "../Components/Study"
import AddCard from "../Components/Cards/AddCard"
import EditCard from "../Components/Cards/EditCard"
import CreateDeck from "../Components/Decks/CreateDeck"
import Deck from "../Components/Decks/Deck"
import EditDeck from "../Components/Decks/EditDeck"



function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          
          <Route path='/decks/:deckId/study'>
            <Study />
          </Route>

          <Route path='/decks/new'>
            <CreateDeck />
          </Route>

          <Route exact path='/decks/:deckId'>
            <Deck />
          </Route>

          <Route path='/decks/:deckId/edit'>
            <EditDeck />
          </Route>

          <Route exact path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route>

          <Route path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          
          <Route>
            <NotFound />
          </Route>
        </Switch>  
      </div>
    </>
  );
}

export default Layout;
