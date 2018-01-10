/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Animated, View } from 'react-native';

type Props = {
  text?: string,
  backText?: string,
  color?: string,
  backColor?: string,
  onPress?: Function
};
type State = {};

class FlipCard extends Component<Props, State> {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  };

  render() {
    const {
      text = 'Front',
      backText = 'Back',
      color = '#333',
      backColor = 'lightblue',
      onPress
    } = this.props;

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    return (
      <TouchableWithoutFeedback onPress={this.flipCard}>
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle, { backgroundColor: color }]}>
            <Text style={styles.text}>{text}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.flipCard,
              styles.flipCardBack,
              backAnimatedStyle,
              { backgroundColor: backColor }
            ]}
          >
            <Text style={styles.text}>{backText}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: 'absolute',
    top: 0
  },
  text: {
    color: '#fff'
  }
});

export default FlipCard;
