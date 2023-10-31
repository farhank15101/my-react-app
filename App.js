import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [heads, setHeads] = useState(6);
  const [numQueries, setNumQueries] = useState(1); // New state for the number of queries
  const [result, setResult] = useState('');

  const handleGetRequest = () => {
    for (let i = 0; i < numQueries; i++) {
      axios
        .get('http://localhost:8080/')
        .then((response) => {
          setResult((prevResult) => prevResult + JSON.stringify(response.data, null, 2));
        })
        .catch((error) => {
          setResult((prevResult) => prevResult + `Error: ${error.message}`);
        });
    }
  };

  const handlePostRequest = () => {
    for (let i = 0; i < numQueries; i++) {
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
          setResult((prevResult) => prevResult + JSON.stringify(response.data, null, 2));
        })
        .catch((error) => {
          setResult((prevResult) => prevResult + `Error: ${error.message}`);
        });
    }
  };

  return (
    <div className="App">
      <h1>Coin Flip Simulator</h1>
      <label>
        Number of Heads:
        <input
          type="number"
          value={heads}
          onChange={(event) => setHeads(event.target.value)}
        />
      </label>
      <label>
        Number of Queries:
        <input
          type="number"
          value={numQueries}
          onChange={(event) => setNumQueries(event.target.value)}
          placeholder="Number of queries"
        />
      </label>
      <button onClick={handlePostRequest}>POST Request (# of heads)</button>
      <button onClick={handleGetRequest}>GET request</button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;
