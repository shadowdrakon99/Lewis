import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Dimensions, Image } from "react-native";


const elements = [{ atomicNumber: 6, name: 'C', vale: 4}, { atomicNumber: 6, name: 'O', vale: 6},
{ atomicNumber: 1, name: 'H', vale: 1}]

export default class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    let { height, width } = Dimensions.get('window');
    this.state = {
      showDragAndDrop: true,
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
                showDragAndDrop: false
              })
            );
          }
        }
      });
  }

  isDropArea(gesture) {
    return gesture.moveY > this.state.height-55 && gesture.moveX > this.state.width-55;
  }

  render() {
    return (
      <View style={{ alignItems: "center", width:"20%" }}>
        {this.renderDragAndDrop()}
      </View>
    );
  }

  renderDragAndDrop() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    if (this.state.showDragAndDrop) {
      return (
        <View style={{ position: "absolute" }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.circle, {opacity:this.state.opacity}]}>
            {this.props.children}
          </Animated.View>
        </View>
      );
    }
  }
}

let CIRCLE_RADIUS = 25;
const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
  },
});
