import { useState } from 'react'
import './App.css'
import History from './components/conversions/history';
import ConversionForm from './components/conversions/form';
import Result from './components/conversions/result';

function App() {  
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  return (
    <div className="converter-container">
      <h1>Convertisseur de Devises</h1>
      
      <div className="converter-form">
        <section>
          <ConversionForm 
            setHistory={setHistory}
            setResult={setResult}
            setError={setError}
            error={error}
            result={result}
            history={history}
          />
        </section>
        
        {error && <div className="error-message">{error}</div>}
        
        {result && (
          <Result result={result} />
        )}
        
        {history && (
          <History history={history} />
        )}
      </div>
    </div>
  )
}

export default App
