import React, {useEffect, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck, deleteDeck, deleteCard} from "../../utils/api/index";


function Deck () {
  const [deck, setDeck] = useState ({cards:[]})
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const deckResponse = await readDeck(deckId, abortController.signal);
            setDeck(deckResponse);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        return () => {
            abortController.abort();
        };
    }
    fetchData();
}, [deckId]);

function handleDeleteDeck(deck) {
    
  if (
      window.confirm(
          `Delete this deck? You will not be able to recover it`
      )
  ) {
      history.go(0);
      return deleteDeck(deck.id);
  }
}

function handleDeleteCard(card) {
    
  if (
      window.confirm(
          `Delete this card? You will not be able to recover it`
      )
  ) {
      history.go(0);
      return deleteCard(card.id);
  }
}

  return (
   <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
        <Link to='/'>Home</Link>
        </li>
        <li className="breadcrumb-item" aria-current="page">{deck.name}</li>
        </ol>
      </nav>
    
    <div key={deck.id} className="card-deck">
    <div className="card-body">
    <h5 className="card-title">{deck.name}</h5>
    <p className="card-text">{deck.description}</p>
    <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary m-lg-1 m-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pencil-fill mr-2 mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
      </svg>Edit</Link>
    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary m-lg-1 m-1">
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
    <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary m-lg-1 m-1">Add Cards</Link>
    <button type="button" className="btn btn-danger m-1" onClick={() => handleDeleteDeck(deck)}>
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
  </div>

  {deck.cards.map(card => 
  <div key={card.id} className="card">
  <div className="row">
    <div className="col">{card.front}</div>

  <div className="col"> {card.back}
  <div className="mt-5"> 
  <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary m-lg-1">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pencil-fill mr-2 mb-1"
        viewBox="0 0 16 16"
      >
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
      </svg>Edit</Link>
  <button type="button" className="btn btn-danger m-lg-1" onClick={() => handleDeleteCard(card)}>

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
  </div>
  </div>
  </div>)}
</div> )
}
export default Deck