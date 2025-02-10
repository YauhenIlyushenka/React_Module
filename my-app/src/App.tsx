import { useState } from 'react'
import './App.css'
import FetchFactButton from './components/fetch-fact-button/fetchFactButton';
import SuccessMessage from './components/error-handling/success/success-message';
import ErrorMessage from './components/error-handling/error/error-message';
import axios from 'axios';

const App = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async (): Promise<void> => {
    setError(null);
    try {
      const response = await axios.get('https://catfact.ninja/fact');
      setFact(response.data.fact);
    }
    catch {
      setFact(null);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="App">
      <FetchFactButton fetchFact={fetchFact} />
      
      {fact && <SuccessMessage fact={fact} />}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default App;
