import React, { useState } from 'react';
import './SelectOptionTag.css'

const SelectOptionTag = ({ status, onChangeStatus }) => {
  const [selectedOption, setSelectedOption] = useState(status);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    onChangeStatus(event.target.value);
  };

  return (
    <div className="select-option-tag">
      <div className="select-option-button">
        <span>{selectedOption || 'Search for an option...'}</span>
        <i className="fas fa-angle-down"></i>
      </div>
      <ul className="select-option-list">
        {['request', 'pending', 'done'].map(option => (
          <li key={option}>
            <input
              type="radio"
              id={option}
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={handleChange}
            />
            <label htmlFor={option}>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectOptionTag;
