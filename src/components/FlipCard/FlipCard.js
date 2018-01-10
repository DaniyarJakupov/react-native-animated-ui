/* @flow */
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, Animated, View } from 'react-native';

type Props = {
  text?: string,
  backText?: string,
  color?: string,
  backColor?: string,
  fontSize?: number
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
      fontSize = 14
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
            <Text style={[styles.text, { fontSize }]}>{text}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.flipCard,
              styles.flipCardBack,
              backAnimatedStyle,
              { backgroundColor: backColor }
            ]}
          >
            <Text style={[styles.text, { fontSize }]}>{backText}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  flipCard: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    shadowColor: '#000',
    elevation: 2
  },
  flipCardBack: {
    position: 'absolute',
    top: 0
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});

export default FlipCard;
