import './App.css';
import { useEffect } from 'react';
import { log, init, tracedEvent } from 'trace-ai-sdk/frontend';

function App() {

  useEffect(() => {
    init({
      apiKey: "x-api-key",
      appName: "trace-ai-react-app",
    });
    return () => {
      console.log('App component unmounted');
    };
  }, []);
  return (
    <div className="App">
      <button onClick={() => { tracedEvent("user-clicked-payment", () => { log.info('Payment button clicked'); 
         log.info('Payment made');

      }) }}>Pay now</button>
    </div>
  );
}

export default App;
