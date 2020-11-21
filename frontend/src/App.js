import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Index from "./components/Index";
import Donor from "./components/Donor";
function App() {
  return (
    <Router>
          <Route path='/' exact component={Index} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/donor' component={Donor} />
      </Router>
  );
}

export default App;
