import React, { useState } from 'react';
import './SearchBox.css'; // Import CSS file for styling

const SearchComponent = ({ onSearch }) => {
    const [searchTextInput, setSearchTextInput] = useState('');

    const handleChange = (event) => {
        setSearchTextInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTextInput);
    };

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTextInput}
                onChange={handleChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchComponent;
