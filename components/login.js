import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this);
    this.state = {
      email: '',
      password: '',
      emailError: "User don't exist",
      emailErrorShown: false,
      passwordError: "Wrong password",
      passwordErrorShown: false,
    }
  }

  login() {
    this.setState({ emailErrorShown: false, passwordErrorShown: false });
    if (!this.state.email || !this.state.password) {
      return this.setState({ emailError: "Provide an email and a password", emailErrorShown: true });
    }
    fetch('https://smartgardenapi.herokuapp.com/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        remember: true
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.message) {
        console.log(responseJson.message)
        switch (responseJson.message) {
          case "User not found":
            this.setState({ emailError: responseJson.message, emailErrorShown: true })
          case "Wrong password":
            this.setState({ passwordError: responseJson.message, passwordErrorShown: true })
          default:
            return
        }
      }
      if (responseJson.token != null) {
        AsyncStorage.setItem('@SmartGarden:token', responseJson.token, (error) => {
          if (error) {
            console.log(error);
          }
          this.props.navigator.replace({ name: 'start' });
        });
      }
    })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.logo}>
            <Text style={styles.logoLabelOne}>Smart</Text>
            <Text style={styles.logoLabelTwo}>Garden</Text>
          </View>
          {this.state.emailErrorShown ? <Text style={styles.error}>{this.state.emailError}</Text> : null}
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder='Email address'
            placeholderTextColor='#d3d3d3'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email: email })}
          />
          {this.state.passwordErrorShown ? <Text style={styles.error}>{this.state.passwordError}</Text> : null}
          <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor='#d3d3d3'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password: password })}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={this.login}
            >
            <Text style={styles.label}>Login</Text>
          </TouchableHighlight>
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
    backgroundColor: '#192C3F',
  },
  logo: {
    flexDirection: 'row',
    marginBottom: 100
  },
  logoLabelOne: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff'
  },
  logoLabelTwo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#48CFAD'
  },
  form: {
    width: 260,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 14,
    paddingRight: 4,
    color: '#ffffff'
  },
  button: {
    width: 260,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#48CFAD',
    paddingTop: 11
  },
  label: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff'
  },
  error: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: 12
  }
})

export default Login;
