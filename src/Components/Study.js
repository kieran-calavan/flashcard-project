import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck} from "../utils/api/index"

function Study() {
    const [deck, setDeck] = useState ({cards:[]})  
    const {deckId} = useParams();
    const history = useHistory()
    const [card, setCard] = useState(0)
    const [front, setFront] = useState (true)
    useEffect(() => {
       readDeck(deckId).then(setDeck)
    },[deckId])
    function showCard() {
      if (!deck.cards.length) return 
      if (front) {  
        return deck.cards[card].front
      }  
      return deck.cards[card].back
    }

    function next () {
      if (card === deck.cards.length-1) {
        if (window.confirm("Restart cards?")) {
        return setCard(0)
        }
        history.push("/")
        return 
      }
      setCard(card+1)
    }
  return (
   <div>
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page"> 
        <Link to='/'>Home</Link> </li>

        <li className="breadcrumb-item"> 
        <Link to={`/decks/${deckId}`}>{deck.name}</Link> </li>
        </ol>
    </nav>

    <div key={deck.id} className="card">
    <div className="card-body">
    

    {deck.cards.length < 3?(
      <div> 
        <h5>
          Not enough cards.
        </h5>
        <p> You need at least 3 cards to study. There are {deck.cards.length} cards in the deck.</p>
        <Link to={`/decks/${deck.id}/cards/new`}>Add Cards</Link>
      </div>
    ):(
      <div> 
        <p className="card-text">Card {card+1} of {deck.cards.length}</p>
    <p className="card-front">{showCard()}</p>
    <button onClick={() => setFront(!front)} className="btn btn-secondary">Flip</button>
    {front === false && <button onClick={() => next()} className="btn btn-primary">Next</button>}
      </div>
    )}
    

    </div>

  </div>
</div> )
}

export default Study