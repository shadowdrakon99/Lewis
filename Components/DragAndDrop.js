import React, { Component } from "react";
import { StyleSheet, View, Text, PanResponder, Animated, Dimensions, Image } from "react-native";


const elements = [{ atomicNumber: 6, name: 'C', vale: 4}, { atomicNumber: 6, name: 'O', vale: 6},
{ atomicNumber: 1, name: 'H', vale: 1}]

class DragAndDrop extends Component {
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
    return gesture.moveY > this.state.height-200;
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
            style={[panStyle, styles.circle, {opacity:this.state.opacity}]}
          >{this.props.children}</Animated.View>
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
          <DragAndDrop ><Lewis element={elements[0]} /></DragAndDrop>
          <DragAndDrop ><Lewis element={elements[2]} /></DragAndDrop>
          <DragAndDrop ><Lewis element={elements[1]} /></DragAndDrop>
          <DragAndDrop ><Lewis element={elements[0]} /></DragAndDrop>
          <DragAndDrop ><Lewis element={elements[1]} /></DragAndDrop>
          <DragAndDrop ><Lewis element={elements[0]} /></DragAndDrop>
          <DragAndDrop ><Lewis element={elements[2]} /></DragAndDrop>
          <DragAndDrop ><Lewis element={elements[0]} /></DragAndDrop>

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
    height:0,
    width:1,
    paddingTop: 10
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

class Lewis extends Component { // TODO: Holds logic for displaying bonds and free electron pairs
  render() {
    // use conditional rendering
    // say if the box is outside the header region then we'll render a element with electrons
    // else we render only the letter with the element symbol
    return (
      <View>
        <Text>{this.props.element.name}</Text>

      </View>
    )
  }
}
