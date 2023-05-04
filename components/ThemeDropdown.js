// components/ThemeDropdown.js
import React from 'react';
import { themes } from "prism-react-renderer";
const ThemeDropdown = ({ changeTheme }) => {
  const themeList = Object.keys(themes);

  return (
    <select
      className="rounded"
      onChange={(e) => changeTheme(e.target.value)}
    >
      {themeList.map((theme, i) => (
        <option key={i} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
};

export default ThemeDropdown;
