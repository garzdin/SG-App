import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Navigator,
  Text,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';
import { routes } from './app';

class Start extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      data: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      loaded: false
    }
  }

  fetchData() {
    fetch('https://smartgardenapi.herokuapp.com/boards/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Token': this.props.token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        data: responseJson.boards,
        dataSource: this.state.dataSource.cloneWithRows(responseJson.boards),
        loaded: true
      });
    })
    .done();
  }

  componentWillMount() {
    this.fetchData();
  }

  pressRow(row) {
    this.props.navigator.push({ name: 'details', data: this.state.data[row] })
  }

  renderRow(rowData, section, row) {
    return (
      <TouchableHighlight
        style={styles.row}
        onPress={() => this.pressRow(row)}
      >
        <Text style={styles.rowText}>{rowData.name}</Text>
      </TouchableHighlight>
    )
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.container}>
          <Text>
            Loading devices...
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192C3F'
  },
  list: {
    marginTop: 65
  },
  row: {
    flexDirection: 'row',
    height: 40,
    paddingTop: 12
  },
  rowText: {
    color: '#ffffff',
    marginLeft: 20
  }
})

export default Start;
