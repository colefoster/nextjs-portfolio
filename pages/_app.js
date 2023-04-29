import '@styles/globals.css'
import { SettingsProvider } from '../contexts/PersonalitySettingsContext';


function Application({ Component, pageProps }) {
  return (
    <SettingsProvider>

      <Component {...pageProps}/>

    </SettingsProvider>

  );
}

export default Application
