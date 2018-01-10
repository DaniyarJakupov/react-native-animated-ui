/* @flow */
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

type Props = {
  filled?: boolean,
  color?: string
};

const Heart = ({ filled, color = '#e31745' }: Props) => {
  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeart, styles.heartShape, styles.emptyFill]} />
      <View style={[styles.rightHeart, styles.heartShape, styles.emptyFill]} />
    </View>
  );
  const fillStyle = filled ? { backgroundColor: color } : styles.empty;

  return (
    <Animated.View style={[styles.heart]}>
      <View style={[styles.leftHeart, styles.heartShape, fillStyle]} />
      <View style={[styles.rightHeart, styles.heartShape, fillStyle]} />
      {!filled && centerNonFilled}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heart: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent'
  },
  heartShape: {
    width: 30,
    height: 45,
    position: 'absolute',
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  fit: {
    transform: [{ scale: 0.9 }]
  },
  emptyFill: {
    backgroundColor: '#FFF'
  },
  empty: {
    backgroundColor: '#ccc'
  },
  leftHeart: {
    transform: [{ rotate: '-45deg' }],
    left: 5
  },
  rightHeart: {
    transform: [{ rotate: '45deg' }],
    right: 5
  }
});

export default Heart;
