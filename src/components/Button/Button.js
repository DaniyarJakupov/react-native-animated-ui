/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Animated } from 'react-native';

type Props = {
  text?: string,
  color?: string,
  onPress?: Function
};
type State = {};

class Button extends Component<Props, State> {
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.5
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
  };

  render() {
    const { text = 'Press', color = '#333', onPress } = this.props;

    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={onPress}
      >
        <Animated.View style={[styles.button, animatedStyle, { backgroundColor: color }]}>
          <Text style={styles.text}>{text}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: '#000',
    elevation: 2
  },
  text: {
    color: '#fff'
  }
});

export default Button;
