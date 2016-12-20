import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  StatusBar,
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
      token: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@SmartGarden:token', (error, result) => {
      if (result) {
        this.setState({ isLoggedIn: true, token: result });
      } else {
        this.setState({ isLoggedIn: false, token: '' });
      }
    })
  }

  renderScene(route, navigator) {
    let RouteComponent = routes[route.name];
    return <RouteComponent route={route} navigator={navigator} token={this.state.token} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Navigator
          style={styles.container}
          initialRoute={{ name: this.state.isLoggedIn ? 'start' : 'login' }}
          renderScene={this.renderScene}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App;
