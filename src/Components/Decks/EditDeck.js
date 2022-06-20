import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";


function EditDeck() {
  const [deck, setDeck] = useState({name:"",description:""})
  const {deckId} = useParams();
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        if (!deckId) {
          return 
        }
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


  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await updateDeck(

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
        <li className="breadcrumb-item"> 
        <Link to={`/decks/${deck.id}/study`}>{deck.name}</Link></li>
        <li className="breadcrumb-item" aria-current="page">Edit Deck</li>
      </ol>
      </nav>
        
  <DeckForm submitHandler={submitHandler} deck={deck} setDeck={setDeck}/>
</div>
  )
}
export default EditDeck