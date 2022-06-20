import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";


function CreateDeck() {
  const [deck, setDeck] = useState({name:"",description:""})
  const history = useHistory()

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await createDeck(
      deck
    );
    history.push("/decks/"+response.id)
    console.log("Saved response!", response);
  };
  return (
    <div>
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page"><Link to ='/'>Home</Link></li>
        <li className="breadcrumb-item" aria-current="page">Create Deck</li>
      </ol>
      </nav>
        
  <DeckForm submitHandler={submitHandler} deck={deck} setDeck={setDeck}/>
</div>
  )
}
export default CreateDeck