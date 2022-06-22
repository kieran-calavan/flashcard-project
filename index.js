import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./src/Layout/Header";
import NotFound from "./src/Layout/NotFound";
import Home from "./src/Components/Home"
import Study from "./src/Components/Study"
import AddCard from "./src/Components/Cards/AddCard"
import EditCard from "./src/Components/Cards/EditCard"
import CreateDeck from "./src/Components/Decks/CreateDeck"
import Deck from "./src/Components/Decks/Deck"
import EditDeck from "./src/Components/Decks/EditDeck"



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
