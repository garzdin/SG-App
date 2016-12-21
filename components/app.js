import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import Login from './login';
import Start from './start';
import Details from './details';

let routesList = [
  { index: 0, component: Login, title: 'Login' },
  { index: 1, component: Start, title: 'Devices' },
  { index: 2, component: Details, title: 'Details' }
];

let routes = {
  'login': routesList[0],
  'devices': routesList[1],
  'details': routesList[2]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      token: ''
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('@SmartGarden:token', (error, result) => {
      if (result) {
        this.setState({ isLoggedIn: true, token: result });
      } else {
        this.setState({ isLoggedIn: false, token: '' });
      }
      this.setState({ isLoading: false });
    })
  }

  renderScene(route, navigator) {
    let RouteComponent = routes[route.name].component;
    return <RouteComponent route={route} navigator={navigator} token={this.state.token} data={route.data} />;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}></View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Navigator
          style={styles.container}
          initialRoute={{ name: this.state.isLoggedIn ? 'devices' : 'login' }}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                 switch (route.name) {
                  case 'details':
                    return (
                      <TouchableHighlight
                        onPress={() => {
                          navigator.pop()
                        }}
                      >
                        <Text style={styles.leftBarButton}>Back</Text>
                      </TouchableHighlight>
                    )
                    break
                  default:
                    return null
                 }
               },
               RightButton: (route, navigator, index, navState) => {
                if (route.name === 'devices') {
                  return (
                    <TouchableHighlight
                      onPress={() => {
                        AsyncStorage.removeItem('@SmartGarden:token', (error) => {
                          if (error) {
                            console.log(error);
                          }
                          navigator.replace({ name: 'login' })
                        })
                      }}
                    >
                      <Text style={styles.rightBarButton}>Logout</Text>
                    </TouchableHighlight>
                  );
                } else {
                  return null;
                }
               },
               Title: (route, navigator, index, navState) => {
                 switch (route.name) {
                   case 'login':
                     return (<Text style={styles.title}>Login</Text>)
                     break
                  case 'devices':
                       return (<Text style={styles.title}>Devices</Text>)
                       break
                  case 'details':
                    return (<Text style={styles.title}>Details</Text>)
                    break
                  default:
                    return null
                 }
               }
              }}
              style={styles.navigation}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    backgroundColor: '#48CFAD'
  },
  title: {
    color: '#ffffff',
    fontWeight: '600',
    paddingTop: 10
  },
  leftBarButton: {
    color: '#ffffff',
    fontWeight: '600',
    paddingTop: 10,
    marginLeft: 10
  },
  rightBarButton: {
    color: '#ffffff',
    fontWeight: '600',
    paddingTop: 10,
    marginRight: 10
  }
})

export default App;
export { routes };
