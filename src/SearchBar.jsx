// SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ suggestions, onSearch }) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
    setShowSuggestions(true);
    onSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search products..."
        className="search-input"
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => handleSuggestionClick(s)}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
