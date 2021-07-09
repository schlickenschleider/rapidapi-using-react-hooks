import React, { useEffect, useCallback } from 'react'
import axios from 'axios'
import './App.css';

function App() {
  let [responseData, setResponseData] = React.useState('')

  const fetchData = useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://quotes15.p.rapidapi.com/quotes/random/",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
        "params": {
        "language_code": "en"
        }
    })
    .then((response) => {
      setResponseData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  })

  useEffect(() => {
    fetchData()
  },[fetchData])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Famous Quotes Generator</h1>
        <button type="button" onClick={fetchData}>Quote</button>
      </header>
      <main>
        {responseData &&
          <blockquote>
            "{responseData && responseData.content}"
            <small>{responseData && responseData.originator && responseData.originator.name}</small>
          </blockquote>
        }
        </main>
    </div>
  );
}

export default App;
