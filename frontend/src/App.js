import React from 'react';
import Toolbar from "./component/Toolbar/Toolbar";

import MainPage from "./container/main-page";
import {Container} from 'reactstrap'
import {Route,Switch} from 'react-router-dom'
import Register from "./container/Register/Register";
import Login from "./container/Login/Login";
import TrackHistory from "./container/TrackHistory/TrackHistory";
import Authors from "./container/Authors/Authors";
import Albums from "./container/Albums/Albums";
import NewAuthor from "./container/NewAuthor/NewAuthor";
import NewAlbum from "./container/NewAlbum/NewAlbum";
import NewTrack from "./container/NewTrack/NewTrack";

function App() {
  return (
    <div className="App">
        <header>
            <Toolbar/>
        </header>
        <Container>
            <Switch>
                <Route path="/" exact component={Authors}/>
                <Route path="/albums/:id" component={Albums}/>
                <Route path="/tracks/:id" exact component={MainPage}/>
                <Route path="/track_history" exact component={TrackHistory}/>
                <Route path="/addAuthor" exact component={NewAuthor}/>
                <Route path="/addAlbum" exact component={NewAlbum}/>
                <Route path="/addTrack" exact component={NewTrack}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
            </Switch>
        </Container>
    </div>
  );
}

export default App;
