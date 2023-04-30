import React, {useState, useEffect} from 'react';

import { useSettings } from '../../contexts/PersonalitySettingsContext';

function DropdownRadio() {
  const { settings, updateSettings } = useSettings(); 

  const handleOptionChange = (changeEvent) => {
    updateSettings({selectedPersonality : Number(changeEvent.target.value)});
    setShowDropdown(false)
  };

  const [showDropdown, setShowDropdown] = useState(false);  
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="relative pb-3">
      {/* Dropdown button */}
      <button
        id="dropdownRadioButton"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        "
        type="button"
        onClick={handleDropdownClick}
      >
        Select a Personality
        <svg
          className=" w-8 h-7 right-0.5 "
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      
      <div
        id="dropdownRadio"
        className={`${showDropdown ? '' : ' hidden '}   -translate-x-1/2 left-1/2 w-2/3 absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
        <ul className="p-3 space-y-1 text-md text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioHelperButton">
          
          {settings.personalities.map((option, index) => (
            <li key={option.name}>
              <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600" >
                <div className="flex items-center h-5" >
                  <input
                    id={`helper-radio-${index}`}
                    name="helper-radio"
                    type="radio"
                    checked={settings.selectedPersonality===index}
                    value={index}
                    onChange={handleOptionChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div className="ml-8 text-sm">
                  <label htmlFor={`helper-radio-${index}`} className="font-medium text-gray-900 dark:text-gray-300">
                    <div>{option.name}</div>
                    <p id="helper-radio-text-4" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                      {option.description}
                    </p>
                  </label>
                </div>

                <div className="emoji-column ml-4 text-xl">
                  <span>{option.icon}</span>
                </div>

              </div>
            </li>))}
        </ul>
      </div>
    </div>
  );
}
export default DropdownRadio;                  
