/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

const getTransformStyle = animation => {
  return {
    transform: [
      {
        translateY: animation
      }
    ]
  };
};

type Props = {
  color?: string,
  onPress?: Function
};
type State = {
  fabs: Array<any>,
  animate: any
};

export default class ActionButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      animate: new Animated.Value(0),
      fabs: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]
    };
    this.open = false;
  }

  open: boolean;

  handlePress = () => {
    const toValue = this.open ? 0 : 1;

    const flyouts = this.state.fabs.map((value, i) => {
      return Animated.spring(value, {
        toValue: (i + 1) * -90 * toValue,
        friction: 5,
        useNativeDriver: true
      });
    });

    Animated.parallel([
      Animated.timing(this.state.animate, {
        toValue,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.stagger(10, flyouts)
    ]).start();

    this.open = !this.open;
  };

  pressedFab = i => {
    console.log(i);
  };

  render() {
    const { color = 'rgb(24,214,255)', fabColor = '#9439FF' } = this.props;
    // const fabColorInterpolate = this.state.animate.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['rgb(24,214,255)', 'cornflowerblue']
    // });

    const fabRotate = this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '135deg']
    });

    const fabStyle = {
      transform: [
        {
          rotate: fabRotate
        }
      ]
    };

    return (
      <View style={[styles.position]}>
        {this.state.fabs.map((animation, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.button,
                styles.fab,
                { backgroundColor: fabColor },
                getTransformStyle(animation)
              ]}
              onPress={() => this.pressedFab(i)}
            />
          );
        })}

        <TouchableOpacity onPress={this.handlePress}>
          <Animated.View style={[styles.button, fabStyle, { backgroundColor: color }]}>
            <Text style={styles.plus}>+</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    right: 45,
    bottom: 45
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  plus: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white'
  }
});
