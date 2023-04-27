import '@styles/globals.css'
import { PageSettingsProvider } from '../contexts/PageSettingsContext';

function Application({ Component, pageProps }) {
  

  const settings={
    title: 'Base Settings',
    elements: [<p>None</p>],
  }

  return (
    <PageSettingsProvider settings={settings}>
      <Component {...pageProps} baseSettings={settings} />
    </PageSettingsProvider>
  );
}

export default Application
