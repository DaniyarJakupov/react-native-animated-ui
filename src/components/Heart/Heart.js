/* @flow */
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';

import HeartSkeleton from './HeartSkeleton';

type Props = {
  color?: string,
  explosion?: boolean,
  onPress?: Function
};
type State = {
  liked: boolean,
  scale: any,
  animations: Array<any>
};

const getTransformationAnimation = (animation, scale, y, x, rotate, opacity) => {
  const scaleAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scale]
  });

  const xAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, x]
  });

  const yAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, y]
  });

  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', rotate]
  });

  const opacityAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity]
  });

  return {
    opacity: opacityAnimation,
    transform: [
      { scale: scaleAnimation },
      { translateX: xAnimation },
      { translateY: yAnimation },
      { rotate: rotateAnimation }
    ]
  };
};
export default class Heart extends Component<Props, State> {
  static defaultProsp = {
    explosion: false,
    color: 'crimson'
  };

  state = {
    liked: false,
    scale: new Animated.Value(0),
    animations: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0)
    ]
  };

  triggerLike = () => {
    this.setState({
      liked: !this.state.liked
    });

    const showAnimations = this.state.animations.map(animation => {
      return Animated.spring(animation, {
        toValue: 1,
        friction: 4
      });
    });

    const hideAnimations = this.state.animations
      .map(animation => {
        return Animated.timing(animation, {
          toValue: 0,
          duration: 50
        });
      })
      .reverse();

    this.props.explosion
      ? Animated.parallel([
          Animated.spring(this.state.scale, {
            toValue: 2,
            friction: 3
          }),
          Animated.sequence([
            Animated.stagger(50, showAnimations),
            Animated.delay(100),
            Animated.stagger(50, hideAnimations)
          ])
        ]).start(() => {
          this.state.scale.setValue(0);
        })
      : Animated.spring(this.state.scale, {
          toValue: 2,
          friction: 3
        }).start(() => {
          this.state.scale.setValue(0);
        });
  };

  render() {
    const { liked } = this.state;
    const { color, onPress, explosion } = this.props;
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1]
    });
    const heartButtonStyle = {
      transform: [{ scale: bouncyHeart }]
    };

    return (
      <TouchableWithoutFeedback onPressIn={this.triggerLike} onPress={onPress}>
        <View>
          <HeartSkeleton
            filled
            color={color}
            style={[
              styles.heart,
              getTransformationAnimation(this.state.animations[5], 0.4, -180, 0, '10deg', 0.8)
            ]}
          />
          <HeartSkeleton
            filled
            color={color}
            style={[
              styles.heart,
              getTransformationAnimation(this.state.animations[4], 0.7, -120, 40, '45deg', 0.6)
            ]}
          />
          <HeartSkeleton
            filled
            color={color}
            style={[
              styles.heart,
              getTransformationAnimation(this.state.animations[3], 0.7, -120, -40, '-45deg', 0.7)
            ]}
          />
          <HeartSkeleton
            filled
            color={color}
            style={[
              styles.heart,
              getTransformationAnimation(this.state.animations[2], 0.3, -150, 120, '-35deg', 0.7)
            ]}
          />
          <HeartSkeleton
            filled
            color={color}
            style={[
              styles.heart,
              getTransformationAnimation(this.state.animations[1], 0.3, -120, -120, '-35deg', 0.6)
            ]}
          />
          <HeartSkeleton
            filled
            color={color}
            style={[
              styles.heart,
              getTransformationAnimation(this.state.animations[0], 0.7, -60, 0, '35deg', 0.8)
            ]}
          />

          <Animated.View style={heartButtonStyle}>
            <HeartSkeleton filled={liked} color={color} explosion={explosion} />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  heart: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});
