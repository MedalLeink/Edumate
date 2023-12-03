import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

function SearchButton() {
  const [query, setQuery] = useState("");
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?title=${query}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="search_btn">
        <a href="">
          <BsSearch className="s_button" style={{width: '1.3em', height: '1.3em'}} type="button" onClick={handleClick} />
        </a>
        <input type="search" placeholder="Search..." />
      </div>
    </>
  );
}

export default SearchButton;
