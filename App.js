import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';



export default class  App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This will be the page that renders everything</Text>

     <Button onPress={alert}
      title="3D Molecules"
      color = "#01e4fe">
     </Button>
     <Button onPress={alert}
      title="2D Lewis Dot"
      color = "#01e4fe">
     </Button>
     <Button onPress={alert}
      title="Periodic Table"
      color = "#01e4fe">
     </Button>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
