import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import Footer from "./components/Footer/Footer";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import { BrowserRouter as Router, Route,  Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/leaderboard">
            <Header />
            <Leaderboard />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Game />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
