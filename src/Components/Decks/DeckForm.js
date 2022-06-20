import React from "react";
import { Link } from "react-router-dom";

function DeckForm({submitHandler,deck={name:"",description:""},setDeck}) {
  
  const changeHandler = (event) => {
    setDeck({ ...deck, [event.target.name]: event.target.value });
  };

  
  return (
    <div>
      
        
  <form onSubmit={submitHandler}>
    <fieldset>
    <label className="mr-3" htmlFor="name">Name</label>
    <input
      id="name"
      type="text"
      name="name"
      required
      placeholder="Deck Name"
      value={deck.name}
      onChange={changeHandler}
    />
    </fieldset>
    <fieldset>
    <label className="mr-3" htmlFor="description">Description</label>
    <textarea
        id="description"
        type="text"
        name="description"
        placeholder="Brief description of the deck"
        defaultValue={deck.description}
        onChange={changeHandler}
      />
    </fieldset>


<Link to="/" className="btn btn-secondary">Cancel</Link>
<button className="btn btn-primary">Submit</button>
</form>
</div>
  )
}
export default DeckForm