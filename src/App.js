import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {MuiThemeProvider} from '@material-ui/core';
import './App.css';
import {createMuiTheme} from '@material-ui/core/styles';

import VerifyComponent from "./Verify";
import {Switch} from "react-router";

const theme= createMuiTheme({
   palette:{
       type: "dark",
       primary : {
           main: '#5882FA'
       }
   },
   typography: {
       useNextVariants: true
   }
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
              <Switch>
                  <Route path="/verify" component={VerifyComponent} />
                  <Redirect to="/verify"/>
              </Switch>
          </BrowserRouter>
        </MuiThemeProvider>

    );
  }
}

export default App;
