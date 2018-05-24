/* @flow */
import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Color, IconPath } from '../../utils';

type Props = {
  onPress?: Function,
  svgPath?: string,
  viewBox?: string,
  size?: number,
  color?: string,
  disabled?: boolean
};
type State = {
  scale: any
};

export default class Icon extends Component<Props, State> {
  static defaultProps = {
    disabled: false
  };

  state = {
    scale: new Animated.Value(0)
  };

  handlePressIn = () => {
    Animated.spring(this.state.scale, {
      toValue: 2,
      friction: 3
    }).start(() => {
      this.state.scale.setValue(0);
    });
  };

  render() {
    const {
      onPress,
      svgPath = IconPath.HEART,
      viewBox = '0 0 48 48',
      size = 30,
      color = Color.BLUE
    } = this.props;

    const bouncyIcon = this.state.scale.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 0.5, 1]
    });
    const animatedStyle = {
      transform: [{ scale: bouncyIcon }]
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={onPress}
        onPress={this.props.disabled ? null : this.handlePressIn}
      >
        <Animated.View style={animatedStyle}>
          <Svg style={{ width: size, height: size, alignSelf: 'center' }} viewBox={viewBox}>
            <Path d={svgPath} fill={color} stroke={color} />
          </Svg>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
