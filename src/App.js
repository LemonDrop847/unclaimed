import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/navbar';
import Objects from './components/objectPage';
import DashBoard from './components/dashboard';
import AddObject from './components/addObject';
import Foot from './components/foot';
import About from './components/about';

function App() {
  return (
    <Router>
        <div className="App">
          <Navbar/>
          <div className="content">
            <Routes>
              <Route path="/"element={<Home/>}/>
              <Route path="/addObject" element={<AddObject/>}/>
              <Route exact path="/about"element={<About/>}/>
              <Route exact path="/dashboard"element={<DashBoard/>}/>
              <Route exact path="/objects/:id" element={<Objects/>}/>
            </Routes>
          </div>
          <Foot/>
        </div>
      </Router>
        
  );
}

export default App;
