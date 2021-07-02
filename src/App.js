

import React, {useState} from 'react';

const api ={
  key:'012775af5f4b4d830c946593627d2444',
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const search = event =>{
    if(event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setQuery('');
        setWeather(result)
        console.log(result)
        
      });
    }
  }

  function dateBuilder(){
    let months = ["January" , "Febuary" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]

    let days= ["Monday" , "Tuesday" , "Wednesday" , "Thrusday" , "Friday" , "Saturday"]

    let today = new Date();
    
    let day =  days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()+1];
    let year = today.getFullYear();
    let time = today.toLocaleTimeString()

    return `${day}, ${date} ${month} ${year}, ${time}`
  }
  
  return (
    <div className={(typeof weather.main !== 'undefined') ? (weather.main.temp > 16) ? 'app warm' : 'app': 'app'}>
      <main>
        <div className="search-box">
          <input type='text' className = "search-bar" 
          placeholder="Enter a city name..." onChange={(e)=>setQuery(e.target.value) }
            value={query} onKeyPress={search}
          />

        </div>
        {(typeof weather.main != "undefined") ?(
        <div>
          <div className="location-box">
            <div className= "location">{weather.name}, {weather.sys.country}</div>
            <div className= "date">{dateBuilder()}</div>
          </div>
          <div className="whether-box">
            <div className="temp">
            {Math.round(weather.main.temp)}°c
            </div>
            <div className="whether"> {weather.weather[0].main}</div>
            
          </div>
        </div>
        ):('')}
      </main>
    </div>
  );
}

export default App;
