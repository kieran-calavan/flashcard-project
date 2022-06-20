import React,{useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import { readDeck, readCard, updateCard} from "../../utils/api/index";
import CardForm from "./CardForm"


function EditCard() {
    const [deck, setDeck] = useState ({})
    const {deckId, cardId} = useParams();  
    const history = useHistory()
    const initialState = {
      front: "",
      back: "",
  };

  const [card, setCard] = useState(initialState);

  useEffect(() => {
      async function fetchData() {
          const abortController = new AbortController();
          try {
              const response = await readDeck(deckId, abortController.signal);
              setDeck(response);
          } catch (error) {
              console.error("Something went wrong", error);
          }
          return () => {
              abortController.abort();
          };
      }
      fetchData();
  }, [deckId]);

  useEffect(() => {
    async function fetchData() {
        const abortController = new AbortController();
        try {
            const response = await readCard(cardId, abortController.signal);
            setCard(response);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        return () => {
            abortController.abort();
        };
    }
    fetchData();
}, [cardId]);

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard(
        { ...card },
        abortController.signal
    );
    history.push("/decks/"+deckId);
    return response;
}

return (
    <div>
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page"><Link to ='/'>Home</Link></li>
        <li className="breadcrumb-item" aria-current="page"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
        <li className="breadcrumb-item" aria-current="page">Edit Deck</li>
      </ol>
      </nav>
        
<CardForm submitHandler = {submitHandler} card = {card} setCard = {setCard} />

</div>
  )
}
export default EditCard