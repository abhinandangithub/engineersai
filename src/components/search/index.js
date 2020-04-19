import React, { useState, useEffect } from "react";

const Search = ({ value, onInputChange }) => {

    return (
        <div>
            <input onChange={onInputChange} value={value}/>
        </div>
    )
};

export default Search;