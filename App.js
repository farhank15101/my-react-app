import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [heads, setHeads] = useState(6);
  const [result, setResult] = useState('');

  const handleGetRequest = () => {
    axios
      .get('http://localhost:8080')
      .then((response) => {
        setResult(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        setResult(`Error: ${error.message}`);
      });
  };

  const handlePostRequest = () => {
    axios
      .post(
        'http://localhost:8080/compute',
        { heads },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setResult(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        setResult(`Error: ${error.message}`);
      });
  };

  return (
    <div className="App">
      <h1>Coin Flip Simulator</h1>
      <input
        type="number"
        value={heads}
        onChange={(event) => setHeads(event.target.value)}
      />
      <button onClick={handlePostRequest}>POST Request (# of heads)</button>
      <button onClick={handleGetRequest}>GET request</button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
