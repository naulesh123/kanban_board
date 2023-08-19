import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

const Dropdown = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSubDropdown = () => {
    setIsSubDropdownOpen(!isSubDropdownOpen);
  };

  const handleGroupingSelection = (value) => {
    props.onSelectGrouping(value);
  };

  const handleOrderingSelection = (value) => {
    props.onSelectOrdering(value);
  };

  return (
    <div className="dropdown">
      <button style={{fontSize: '0.8rem',fontWeight:"bold"}} className="dropdown-button" onClick={toggleDropdown}>
        Display
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <div className="sub-dropdown">
            <a href="#" onClick={toggleSubDropdown}>
              Grouping
            </a>
            {isSubDropdownOpen && (
              <div className="sub-dropdown-content">
                <Link to="/" onClick={() => handleGroupingSelection('Status')}>
                  Status
                </Link>
                <Link to="/Priority1" onClick={() => handleGroupingSelection('Priority1')}>
                  Priority
                </Link>
                <Link to="/Users" onClick={() => handleGroupingSelection('Users')}>
                  Users
                </Link>
              </div>
            )}
          </div>
          <div className="sub-dropdown">
            <a href="#" onClick={toggleSubDropdown}>
              Ordering
            </a>
            {isSubDropdownOpen && (
              <div className="sub-dropdown-content">
                <a href="#" onClick={() => handleOrderingSelection('Priority')}>
                  Priority
                </a>
                <a href="#" onClick={() => handleOrderingSelection('Text')}>
                  Text
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
