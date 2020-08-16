import React from 'react';
import logo from './logo.svg';
////Importing styles
import './App.css';
////Importing modules 
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
////Importing components
import Navigation from './components/Navigation';
import Main from './pages/Main';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import Demonstration from './pages/Demonstration';
import Experiences from './pages/Experiences';


class App extends React.Component{
  render(){
    return(
      <Router>
        <Route component={Navigation} />
        <Switch>
          <Route exact path='/Main' component={Main} />
          <Route exact path='/Achievements' component={Achievements} />
          <Route exact path='/Contact' component={Contact} />
          <Route exact path='/Demonstration' component={Demonstration} />
          <Route exact path='/Experiences' component={Experiences} />
          <Route path='/404' component={Main} />	
					<Redirect to='/Main' />
        </Switch>
      </Router>
    );
  }
}

//// Default auto generated code when this project created
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         어지럽지?
//       </header>
//     </div>
//   );
// }

export default App;
