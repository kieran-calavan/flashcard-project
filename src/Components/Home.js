import React, {useEffect, useState} from "react";
import {listDecks, deleteDeck} from "../utils/api/index";
import {Link, useHistory} from "react-router-dom";

function Home () {
  const [decks, setDecks] = useState ([])  
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const deckResponse = await listDecks(abortController.signal);
            setDecks(deckResponse);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        return () => {
            abortController.abort();
        };
    }
    fetchData();
}, []);

  function handleDelete(deck) {
    
    if (
        window.confirm(
            `Delete this deck? You will not be able to recover it`
        )
    ) {
        history.go(0);
        return deleteDeck(deck.id);
    }
}

  return (
   <div>
    <Link to="/decks/new" className="btn btn-secondary my-2 " >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-plus-lg mr-2 mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
      </svg>Create Deck</Link>
     {decks.map(deck =>  <div key={deck.id} className="card">
    <div className="card-body">
    <h5 className="card-title">{deck.name}

    <small text-end="true">
    &nbsp;&nbsp; {deck.cards.length} cards
    </small>
    </h5>
    <p className="card-text">{deck.description}</p>
      <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-lg-1">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-eye-fill mr-2 mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>View</Link>

      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-lg-1 m-2">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-journal-album mr-2 mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 4a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5zm1 7a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z" />
        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
      </svg>Study</Link>

    <button type="button" className="btn btn-danger m-lg-2" onClick={() => handleDelete(deck)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash-fill mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 
        2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 
        0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 
        0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 
        0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
      
      </svg> Delete</button>
    </div>

  </div>)}
</div> )
}

export default Home