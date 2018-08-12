import {Route, NavLink, HashRouter} from "react-router-dom";
import UserStats from '../UserStats';
import Homepage from '../Homepage';
import React from 'react';

export default class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="content">
            <Route exact path="/" component={Homepage}/>
            <Route path="/stats" component={UserStats}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
