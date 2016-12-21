import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

class Details extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows(props.data.readings)
    }
  }

  renderRow(rowData, section, row) {
    return (
      <Text style={styles.rowText}>{rowData.dateRead} {rowData.humidity } % | {rowData.temperature} C | {rowData.light} lux</Text>
    )
  }

  getLastReading() {
    let sorted = this.props.data.readings.sort(function(a, b) {
      return new Date(a.dateRead) > new Date(b.dateRead);
    });
    return sorted[sorted.length - 1];
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{this.props.data.name}</Text>
          <Text style={styles.description}>Serial number: {this.props.data.serialNumber}</Text>
          <Text style={styles.description}>Added on: {this.props.data.dateAdded}</Text>
          <View style={styles.metrics}>
            <Text style={styles.metric}>Humidity: {this.getLastReading().humidity} %</Text>
            <Text style={styles.metric}>Temperature: {this.getLastReading().temperature} C</Text>
            <Text style={styles.metric}>Light: {this.getLastReading().light} lux</Text>
          </View>
        </View>
        <Text style={styles.historyLabel}>History</Text>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeperator={(section, row, adjacentRowHighlighted) => {
            return (
              <View
                style={{
                  height: 2,
                  backgroundColor: '#3B5998'
                }}
              />
            )
          }}
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
  content: {
    marginTop: 65
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff'
  },
  description: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 10,
    color: '#ffffff'
  },
  metrics: {
    marginTop: 20
  },
  metric: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff'
  },
  historyLabel: {
    marginTop: 40,
    marginLeft: 20,
    fontSize: 16,
    color: 'white'
  },
  list: {
    marginTop: 10
  },
  rowText: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5
  }
})

export default Details;
