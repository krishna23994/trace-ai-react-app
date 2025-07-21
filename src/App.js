import './App.css';
import { useEffect } from 'react';
import { log, init, tracedEvent } from 'trace-ai-sdk/frontend';

function App() {

  useEffect(() => {
    init({
      apiKey: "x-api-key",
      appName: "trace-ai-react-app",
      pushForLogLevel: ["info", "error", "debug"],
    });
    return () => {
      console.log('App component unmounted');
    };
  }, []);

  const anotherTracedEvent = (data) => {
    tracedEvent(data,async ({params,traceInfo}) => { 
         log.debug('Pay now button clicked with params in anotherTracedEvent', params);

        throw new Error('Simulated error for testing'); // Simulating an error
      },async ({error,traceInfo})=>{
        console.log("Show modal for traceId in anotherTracedEvent:", traceInfo?.traceId);
        log.error(`Error handler called: in anotherTracedEvent ${error?.message}`);
      },false);
  }

  const handleClick = (e) => {
    tracedEvent({test: "data"},async ({params,traceInfo}) => { 
      log.info('Pay now button clicked with params in handleClick', params);

      anotherTracedEvent(params);
      
    },async ({error,traceInfo})=>{
      console.log("Show modal for traceId:", traceInfo?.traceId);
       log.error(`Error handler called: in handleClick ${error?.message}`);
    },false);
  }

  return (
    <div className="App">
        <button onClick={handleClick}>Pay now</button>
    </div>
  );
}

export default App;
