import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Feed from './components/Feed';
import Account from './components/Account';
import Discover from './components/Discover';

function App() {
  return (
    <Router>
      <NavbarComp />
    <div className="container">
      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/discover" element={<Discover/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
