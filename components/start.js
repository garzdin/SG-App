import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Login from './login';

class Start extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this);
    this.state = {
      isLoggedIn: props.isLoggedIn
    }
  }

  logout() {
    AsyncStorage.removeItem('@SmartGarden:token', (error) => {
      if (error) {
        console.log(error);
      }
    })
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoggedIn ? (
          <View style={styles.container}>
            <Text>Logout</Text>
            <Button
              color="#841584"
              onPress={this.logout}
              title="Logout"
              accessibilityLabel="Login"
            />
          </View>
        ) : (
          <View style={styles.container}>
            <Login />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

export default Start;
