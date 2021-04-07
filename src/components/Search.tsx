import React from "react";

function Search(props) {
  return (
    <div>
      <input
        type="search"
        value={props.value}
        onChange={props.onChange}
        className="form-control w-100"
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Search;
