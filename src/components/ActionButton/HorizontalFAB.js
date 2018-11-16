import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Animated, Easing } from 'react-native';
import Icon from '../Icon/Icon';

const FAB_SIZE = 64;
const MOVE_STOP = 0.2;
const TRANSFORM_STOP = 0.6;
const ANIMATION_DURATION = 750;
const ANIMATION_EASING = Easing.bezier(0.4, 0.0, 0.2, 1);

class HorizontalFAB extends Component {
  constructor() {
    super();

    this.animationProgress = new Animated.Value(0);
  }

  onBtnPress = () => {
    Animated.timing(this.animationProgress, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING
    });
  };

  render() {
    const FAB_CONTAINER_PADDING = 8;
    const INITIAL_FAB_CONTAINER_WIDTH = FAB_SIZE + FAB_CONTAINER_PADDING;
    const INITIAL_FAB_CONTAINER_HEIGHT = FAB_SIZE + FAB_CONTAINER_PADDING;

    const INITIAL_FAB_CONTAINER_POSITION_RIGHT = 16;
    const INTIAL_FAB_CONTAINER_POSITION_BOTTOM = 16;
    const FINAL_FAB_CONTAINER_WIDTH = WINDOW_WIDTH;
    const FINAL_FAB_CONTAINER_HEIGHT = 64;
    const FINAL_FAB_CONTAINER_POSITION_RIGHT = 64;
    const FINAL_FAB_CONTAINER_POSITION_BOTTOM = 0;
    const fabContainerWidth = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_CONTAINER_WIDTH,
        INITIAL_FAB_CONTAINER_WIDTH,
        FINAL_FAB_CONTAINER_WIDTH,
        FINAL_FAB_CONTAINER_WIDTH
      ]
    });
    const fabContainerHeight = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_CONTAINER_HEIGHT,
        INITIAL_FAB_CONTAINER_HEIGHT,
        FINAL_FAB_CONTAINER_HEIGHT,
        FINAL_FAB_CONTAINER_HEIGHT
      ]
    });
    const fabContainerPositionRight = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_CONTAINER_POSITION_RIGHT,
        FINAL_FAB_CONTAINER_POSITION_RIGHT,
        // fab container right position should be again changed to 0, because the fab container takes
        // the entire width
        0,
        0
      ]
    });
    const fabContainerPositionBottom = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INTIAL_FAB_CONTAINER_POSITION_BOTTOM,
        FINAL_FAB_CONTAINER_POSITION_BOTTOM,
        FINAL_FAB_CONTAINER_POSITION_BOTTOM,
        FINAL_FAB_CONTAINER_POSITION_BOTTOM
      ],
      easing: TRANSLATE_CURVE
    });
    const INITIAL_FAB_SCALE = 1;
    const INITIAL_FAB_ICON_OPACITY = 1;
    const FINAL_FAB_SCALE = 15;
    const FINAL_FAB_ICON_OPACITY = 0;
    const fabScale = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [INITIAL_FAB_SCALE, INITIAL_FAB_SCALE, FINAL_FAB_SCALE, FINAL_FAB_SCALE]
    });

    const INITIAL_FAB_POSITION_RIGHT = 16;
    const INTIAL_FAB_POSITION_BOTTOM = 16;
    const FINAL_FAB_POSITION_RIGHT = 64;
    const FINAL_FAB_POSITION_BOTTOM = 0;

    const TRANSLATE_CURVE = Easing.bezier(0, 0.5, 0.5, 1);

    const INPUT_RANGE = [0, MOVE_STOP, TRANSFORM_STOP, 1];

    // change the fab right position duration the MOVE phase and fix it over there
    // for the rest
    const fabPositionRight = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_POSITION_RIGHT,
        FINAL_FAB_POSITION_RIGHT,
        FINAL_FAB_POSITION_RIGHT,
        FINAL_FAB_POSITION_RIGHT
      ]
    });
    const fabPositionBottom = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INTIAL_FAB_POSITION_BOTTOM,
        FINAL_FAB_POSITION_BOTTOM,
        FINAL_FAB_POSITION_BOTTOM,
        FINAL_FAB_POSITION_BOTTOM
      ],
      easing: TRANSLATE_CURVE
    });

    const fabIconOpacity = this.animationProgress.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [
        INITIAL_FAB_ICON_OPACITY,
        FINAL_FAB_ICON_OPACITY,
        FINAL_FAB_ICON_OPACITY,
        FINAL_FAB_ICON_OPACITY
      ]
    });

    return (
      <Animated.View
        style={[
          styles.root,
          {
            position: 'absolute',
            bottom: fabPositionBottom,
            right: fabPositionRight
          }
        ]}
      >
        <TouchableWithoutFeedback onPress={() => this.onBtnPress}>
          <Animated.View style={[styles.iconWrapper, { opacity: fabIconOpacity }]}>
            <Icon disabled color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    backgroundColor: 'gold',
    elevation: 6
  },
  iconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HorizontalFAB;
