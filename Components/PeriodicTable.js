import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Dimensions } from "react-native";

class PeriodicTable extends Component {
  constructor(props) {
    super(props);
    let { height, width } = Dimensions.get('window');
    this.state = {
      showPeriodicTable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
      height: height,
      width: width,
    };
    this.isDropArea = this.isDropArea.bind(this)
  }

  componentWillMount() {

    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onPanResponderGrant: (e, gesture) => {
          this.state.pan.setOffset({
            x: this._val.x,
            y:this._val.y
          })
          this.state.pan.setValue({ x:0, y:0})
        },
        onPanResponderMove: Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ]),
        onPanResponderRelease: (e, gesture) => {
          if (this.isDropArea(gesture)) {
            Animated.timing(this.state.opacity, {
              toValue: 0,
              duration: 1000
            }).start(() =>
              this.setState({
                showPeriodicTable: false
              })
            );
          }
        }
      });
  }

  isDropArea(gesture) {
    return gesture.moveY > this.state.height-200;
  }

  render() {
    return (
      <View style={{ alignItems: "center", width:"20%" }}>
        {this.renderPeriodicTable()}
      </View>
    );
  }

  renderPeriodicTable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showPeriodicTable) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity:this.state.opacity}]}
          ><Text>HCN</Text></Animated.View>
        </View>
      );
    }
  }
}


export default class App extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.ballContainer} />
        <View style={styles.row}>
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
          <PeriodicTable />
        </View>
          <View style={styles.dropZone}>
            <Text style={styles.text}>Drop them here!</Text>
        </View>
      </View>
    );
  }
}

let CIRCLE_RADIUS = 20;
const styles = StyleSheet.create({
  mainContainer: {
    flex:1
  },
  ballContainer: {
    height:100,
    width:1,
  },
  circle: {
    backgroundColor: "white",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
  },
  row: {
    flex:1,
    flexDirection: "row",
    flexWrap:'wrap',
  },
  dropZone: {
    height: 200,
    backgroundColor: "#00334d"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  }
});
