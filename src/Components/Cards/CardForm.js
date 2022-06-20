import React from "react";

function CardForm({submitHandler,card ={},setCard}) {
  
  const changeHandler = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
  };
  

  
  return (
    <div>
  <form className="col" onSubmit={submitHandler}>
    <fieldset>
    <label className="mr-3" htmlFor="front">Front </label>
    <textarea
      id="front"
      type="text"
      name="front"
      required
      placeholder="front"
      value={card.front}
      onChange={changeHandler}
    ></textarea>
    </fieldset>
    <fieldset>
    <label className="mr-3" htmlFor="back">Back </label>
    <textarea
        id="back"
        type="text"
        name="back"
        placeholder="Brief description of the deck"
        value={card.back}
        onChange={changeHandler}
      ></textarea>
      </fieldset>


<button type="button" className="btn btn-secondary">Cancel</button>
<button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}
export default CardForm