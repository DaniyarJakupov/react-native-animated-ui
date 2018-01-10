/* @flow */
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import HeartSkeleton from './HeartSkeleton';

type Props = {
  color?: string,
  onPress?: Function
};
type State = {
  liked: boolean,
  scale: any,
  animations: Array<any>
};

export default class Heart extends Component<Props, State> {
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

    Animated.spring(this.state.scale, {
      toValue: 2,
      friction: 3
    }).start(() => {
      this.state.scale.setValue(0);
    });
  };

  render() {
    const { liked } = this.state;
    const { color, onPress } = this.props;
    const bouncyHeart = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.8, 1]
    });
    const heartButtonStyle = {
      transform: [{ scale: bouncyHeart }]
    };

    return (
      <TouchableWithoutFeedback onPressIn={this.triggerLike} onPress={onPress}>
        <Animated.View style={heartButtonStyle}>
          <HeartSkeleton filled={liked} color={color} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
