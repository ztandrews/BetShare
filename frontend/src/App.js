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
import AddBet from './components/AddBet';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/discover" element={<Discover/>}></Route>
        <Route path="/add_bet" element={<AddBet/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
