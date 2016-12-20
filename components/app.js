import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Navigator,
  View
} from 'react-native';
import Login from './login';
import Start from './start';

var routes = {
  login: Login,
  start: Start
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      initialRoute: 'login'
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@SmartGarden:token', (error, result) => {
      if (result) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    })
  }

  renderScene(route, navigator) {
    let RouteComponent = routes[route.name];
    return <RouteComponent route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ name: this.state.isLoggedIn ? 'start' : 'login' }}
        renderScene={this.renderScene}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;
