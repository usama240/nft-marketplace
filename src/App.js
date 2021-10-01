import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateAssets from "./components/CreateAssets";
import MyAssets from "./components/MyAssets";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Images from "./components/Images";
import Music from "./components/Music";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/create-assets" component={CreateAssets} />
          <Route path="/my-assets" component={MyAssets} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/images" component={Images} />
          <Route path="/music" component={Music} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
