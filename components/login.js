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
        password: this.state.password,
        remember: true
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
          <View style={styles.logo}>
            <Text style={styles.logoLabelOne}>Smart</Text>
            <Text style={styles.logoLabelTwo}>Garden</Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder='Email address'
            placeholderTextColor='#d3d3d3'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email: email })}
          />
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
    borderBottomWidth: 1,
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
  }
})

export default Login;
