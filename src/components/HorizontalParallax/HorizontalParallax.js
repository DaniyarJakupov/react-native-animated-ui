/* @flow */
import * as React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import ImageContainer from './ImageContainer';

const { width } = Dimensions.get('window');

type Props = {
  images: Array<{ image: string, title: string }>
};
type State = {
  animatedScroll: Animated.Value,
  scrollEnabled: boolean
};

class HorizontalParallax extends React.Component<Props, State> {
  state = {
    animatedScroll: new Animated.Value(0),
    scrollEnabled: true
  };

  getInterpolate = (animatedScroll: Animated.Value, i: number) => {
    // [translateX for the Image before it is swiped, when we are at the Image, after we swiped away]
    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
    const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];

    return animatedScroll.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp'
    });
  };

  getSeparator = (i: number) => {
    return <View key={i} style={[styles.separator, { left: (i - 1) * width - 2.5 }]} />;
  };

  handleFocus = (focused: boolean) => {
    this.setState({ scrollEnabled: !focused });
  };

  render(): React.Node {
    const { images } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEnabled={this.state.scrollEnabled}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.state.animatedScroll
                }
              }
            }
          ])}
        >
          {images.map((image, i) => {
            return (
              <ImageContainer
                key={image.title}
                {...image}
                translateX={this.getInterpolate(this.state.animatedScroll, i)}
                onFocused={this.handleFocus}
                focused={!this.state.scrollEnabled}
              />
            );
          })}

          {/* {Array(...{ length: images.length + 1 }).map((_, i) => this.getSeparator(i))} */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 5
  }
});

export default HorizontalParallax;
