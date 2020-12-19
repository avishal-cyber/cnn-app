import React from 'react';
import axios from "axios"
import './App.css';

export default function App() {
  const [Loading, setLoading] = React.useState(true)
  const [PageData, setPageData] = React.useState(null)
  const [Current, setCurrent] = React.useState(0)

React.useEffect(() => {
    axios
      .get(`https://demo4846532.mockable.io/newsFeed`)
      .then(res => {
        let data = res.data
        setPageData(data)
        console.log(data)
        setLoading(false)
      });
  }, []);

function upHandler (event) {
  debugger;
  console.log(event.key)
  console.log(Current)
  if (event.key === "ArrowUp") {
  if (Current > 0) {
    console.log("reached")
    document.getElementsByClassName("buttons-holder")[0].scrollBy({top: -100, behavior: "smooth"})
    setCurrent(prevstate => prevstate - 1)
  }
}}  

function downHandler (event) {
  console.log(event.key)
  if (event.key === "ArrowDown") {
  if (Current < (PageData.rss.channel[0].item.length - 1)) {
    document.getElementsByClassName("buttons-holder")[0].scrollBy({top: 100, behavior: "smooth"})
    setCurrent(prevstate => prevstate + 1)
  }
}} 

React.useEffect(() => {
  window.addEventListener("keydown", downHandler)
  window.addEventListener("keyup", upHandler)

  return() => {
    window.removeEventListener("keydown", downHandler)
    window.removeEventListener("keyup", upHandler)
  }
})

  const handleClick = index => {
    setCurrent(index)
    console.log(index)
  }

  

  return (
    <div className = "App">
      {Loading === true ? <header className="App-header"><h2>Page loading... </h2></header> :(
        <>
      <header className="App-header">
        <h2>{PageData.rss.channel[0].title[0]}</h2>
    </header>
    <main>
      <div className = "max-width-container maindiv">
        <div>
    <h2>{PageData.rss.channel[0].title[0]}</h2>
      <p>{PageData.rss.channel[0].description[0]}</p>
      </div>

        <div className = "main-content ">
          
          <div className= "news-list">
            <p onClick ={(() => upHandler({key : "ArrowUp"}))}className = "arrow"> &#x2b06;</p>
          <div className = "buttons-holder">
      {PageData.rss.channel[0].item.map((el,index) => {
        return (
          <div key={index} className = "card-buttons" id = {Current === index ? "active" : "null"}>
            <button onClick={() => handleClick( index )}>{el.title[0]}</button>
          </div>
        )
      })}
      </div>
      <p onClick = {(() => downHandler({key: "ArrowDown"}))} className = "arrow">&#x2b07;</p>
      </div>
      <div>
        <video 
        key={Current}
        controls
        id="video"
        >
        <source
        src={PageData.rss.channel[0].item[Current].link[0]}
        type="video/mp4"
        />
        Your browser does not support the video tag.
        </video>
      <div className = "vid-desc"><p>{PageData.rss.channel[0].item[Current].description[0].split('<')[0]}</p></div>
        
      </div>
      </div>
      </div>
    </main>
    </>
      )} 
</div>
  );
      }