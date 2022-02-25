import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

function App() {
  const pageSize=10;
  const [progress,setProgress]=useState(0);
  const apiKey=process.env.REACT_APP_NEWS_API;

  const showProgress=(val)=>{
    setProgress(val)
  }
  return (
    <>
    <Router>
    <NavBar/>
    <LoadingBar
        color='#f11946'
        // height={3}
        progress={progress}
      />
    <Routes>
    <Route exact path="/" element={<News apiKey={apiKey} showProgress={showProgress} key="home" pageSize={pageSize} category="general" country="in"/>}/>
    <Route path="/general" element={<News apiKey={apiKey} showProgress={showProgress} key="general" pageSize={pageSize} category="general" country="in"/>}/>
    <Route path="/science" element={<News apiKey={apiKey} showProgress={showProgress} key="science" pageSize={pageSize} category="science" country="in"/>}/> 
    <Route path="/technology" element={ <News apiKey={apiKey} showProgress={showProgress} key="technology" pageSize={pageSize} category="technology" country="in"/>}/>
    <Route path="/sports" element={<News apiKey={apiKey} showProgress={showProgress} key="sports" pageSize={pageSize} category="sports" country="in"/>}/> 
    <Route path="/entertainment" element={<News apiKey={apiKey} showProgress={showProgress} key="entertainment" pageSize={pageSize} category="entertainment" country="in"/>}/>
    <Route path="/health" element={ <News apiKey={apiKey} showProgress={showProgress} key="health" pageSize={pageSize} category="health" country="in"/>}/>
    <Route path="/business" element={ <News apiKey={apiKey} showProgress={showProgress} key="business" pageSize={pageSize} category="business" country="in"/>}/>

    </Routes>
    </Router>
    </>
  );
}

export default App;
