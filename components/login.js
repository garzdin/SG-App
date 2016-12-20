import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }

  login() {
    fetch('https://smartgardenapi.herokuapp.com/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.token != null) {
        AsyncStorage.setItem('@SmartGarden:token', responseJson.token, (error) => {
          if (error) {
            console.log(error);
          }
          this.props.navigator.replace({ name: 'start' });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder='Email address'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email: email })}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password: password })}
          />
          <Button
            style={styles.button}
            color="#841584"
            onPress={this.login}
            title="Login"
            accessibilityLabel="Login"
          />
        </View>
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
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 180,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 14,
    paddingRight: 4,
  },
  button: {
    backgroundColor: '#841584'
  }
})

export default Login;
