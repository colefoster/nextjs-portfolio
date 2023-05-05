// components/ThemeDropdown.js
import React from 'react';
import { themes } from "prism-react-renderer";
const ThemeDropdown = ({ changeTheme, theme }) => {
    
  const themeList = Object.keys(themes);

  return (
    <div className="dropdown dropdown-hover">
        <label tabIndex={0} className="btn m-3">Theme: {theme}</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {themeList.map((currentTheme, i) => (
                <li key={i} value={currentTheme} onClick={()=>{changeTheme(currentTheme)}}>
                    <a>
                        {currentTheme}
                    </a>
                </li>
            ))}
        </ul>

    
    </div>
  );
};

export default ThemeDropdown;
