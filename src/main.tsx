import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SlideOnlyApp } from './components/SlideOnlyApp';
import './styles.css';

const view = new URLSearchParams(window.location.search).get('view');

function Root() {
  if (view === 'audience' || view === 'presentation') {
    return <SlideOnlyApp mode={view} />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
