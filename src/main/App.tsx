import React from 'react';
import './App.css';
import {Main} from "./Main";
import {RoutesComponent} from "./ui/routes/Routes";

const App = () => {
    return (
        <div className="App">
            <Main/>
            <RoutesComponent/>
        </div>
    );
};

export default App;
