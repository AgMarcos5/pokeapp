
export const Sort = ({setSort}) => {

  return (
    <div>
        <p>Ordenar por: </p>
        <button onClick={() => setSort("id")}>ID</button>
        <button onClick={() => setSort("captured")}>Atrapados</button>
    </div>
  )
}
