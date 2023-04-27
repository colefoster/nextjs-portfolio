// contexts/PageSettingsContext.js

import { createContext, useContext, useState } from 'react';

const PageSettingsContext = createContext();

export const usePageSettings = () => {
  const context = useContext(PageSettingsContext);
  if (!context) {
    throw new Error('usePageSettings must be used within a PageSettingsProvider');
  }
  return context;
};

export const PageSettingsProvider = ({ children, settings }) => {
  const [currentSettings, setCurrentSettings] = useState(settings);

  const updateSettings = (newSettings) => {
    setCurrentSettings({ ...currentSettings, ...newSettings });
  };

  return (
    <PageSettingsContext.Provider value={{ ...currentSettings, updateSettings }}>
      {children}
    </PageSettingsContext.Provider>
  );
};
