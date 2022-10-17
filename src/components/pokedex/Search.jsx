
export const Search = ({onSearch}) => {

  const onInputChange = (e) => {
    onSearch(e.target.value);
  }


  return (
    <div>
      <input 
        placeholder='Buscar pokemon...'
        onChange={onInputChange}
      />
    </div>
  )
}
