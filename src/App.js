import './App.css';
import React,{useState}from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated from Switch to Routes
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


const App=()=> {
 
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress,setProgress]=useState(0);
 
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
            
          
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey}   key="general" pageSize={5} country="us" category="general" />} />
            <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey}   key="business" pageSize={5} country="us" category="business" />} />
            <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey}   key="entertainment" pageSize={5} country="us" category="entertainment" />} />
            <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey}   key="health" pageSize={5} country="us" category="health" />} />
            <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey}   key="science" pageSize={5} country="us" category="science" />} />
            <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey}   key="sports" pageSize={5} country="us" category="sports" />} />
            <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey}   key="technology" pageSize={5} country="us" category="technology" />} />
            <Route exact path='/crypto' element={<News setProgress={setProgress} apiKey={apiKey}   key="crypto" pageSize={5} country="us" category="crypto" />} />
          </Routes>
        </Router>
      </div>
    )
  }

export default App
