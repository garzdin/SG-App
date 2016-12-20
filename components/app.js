import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import Login from './login';
import Start from './start';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
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

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoggedIn ? <Start isLoggedIn={this.state.isLoggedIn} /> : <Login />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export default App;
