import { useState } from "react";

export const Sort = ({setSort}) => {

  const [active, setActive] = useState("id")

  const handleClick = (event) => {
    setActive(event.target.id);
    setSort(event.target.id);
  }

  return (
    <div className="sortContainer">
        <p>Ordenar por: </p>
        <span>
        <button id="id" className={ active === "id" ? 'active' : ''} onClick={handleClick}>ID</button>
        <button id="captured" className={ active === "captured" ? 'active' : ''} onClick={handleClick}>Atrapados</button>
        </span>
    </div>
  )
}
