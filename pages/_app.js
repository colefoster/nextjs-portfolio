import '@styles/globals.css'
import { SettingsProvider } from '../contexts/PersonalitySettingsContext';

import "prismjs/themes/prism-tomorrow.css";


function Application({ Component, pageProps }) {
  return (
    <SettingsProvider>

      <Component {...pageProps}/>

    </SettingsProvider>

  );
}

export default Application
