import React, { Component } from 'react';
import Mecano from './components/Mecano';
//ui
import { MuiThemeProvider } from 'material-ui/styles';
import { theme } from './theme';
import Header from './ui/Header';
import Grid from 'material-ui/Grid';

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={theme.root}>
          <Grid container spacing={24}>
            {/* AppBar */}
            <Grid item xs={12}>
              <Header />
            </Grid>
            {/* mecano */}
            <Grid item xs={12}>
              <Mecano />
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
