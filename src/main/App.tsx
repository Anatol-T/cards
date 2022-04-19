import React, {useEffect} from 'react';
import './App.css';
import {Main} from "./Main";
import {RoutesComponent} from "./ui/routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./bll/appReducer";
import {AppRootStateType} from "./bll/store";
import Preloader from "./ui/common/Preloader/Preloader";

const App = () => {
  const dispatch = useDispatch();

  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])

  if (!isInitialized) {
    return <Preloader/>
  }

    return (
        <div className="App">
            {/*<Main/>*/}
            <RoutesComponent/>
        </div>
    );
};

export default App;
