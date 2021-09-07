import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IframeParent from './IframeParent';
import IframeChild from './IframeChild';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/iframe/" component={IframeParent}/>
          <Route exact path="/iframe-child/" component={IframeChild}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
