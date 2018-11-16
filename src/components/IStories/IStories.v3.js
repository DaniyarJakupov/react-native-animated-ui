/* @flow */
import * as React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Animated from 'react-native-reanimated';

import IStory from './IStory';

const { event, concat, abs, sub, sin, divide, multiply, greaterThan, cond } = Animated;
const { width } = Dimensions.get('window');
const PERSPECTIVE = width;
const A = Math.atan(PERSPECTIVE / width / 2);
const ratio = Platform.OS === 'ios' ? 2 : 1.2;

type Story = {
  id: string,
  source: string,
  user: string
};

type Props = {
  stories: Story[]
};

type State = {
  x: Animated.Value
};

class IStories extends React.Component<Props, State> {
  state = {
    x: new Animated.Value(0)
  };

  getStyle = (index: number) => {
    const { x } = this.state;
    const offset = width * index;
    const inputRange = [offset - width, offset + width];

    const translateX = x.interpolate({
      inputRange,
      outputRange: [width / ratio, -width / ratio],
      extrapolate: 'clamp'
    });

    // Rotation calculated based on Perspective
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [A, -A],
      extrapolate: 'clamp'
    });

    const alpha = abs(rotateY);
    const gamma = sub(A, alpha);
    const beta = sub(Math.PI, alpha, gamma);
    const w = sub(width / 2, multiply(width / 2, divide(sin(gamma), sin(beta))));
    const translateX1 = cond(greaterThan(rotateY, 0), w, multiply(w, -1));

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective: PERSPECTIVE },
        { translateX },
        { rotateY: concat(rotateY, 'rad') },
        { translateX: translateX1 }
      ]
    };
  };

  render(): React.Node {
    const { stories } = this.props;

    const { x } = this.state;

    return (
      <View style={styles.root}>
        {stories.map((story, index) => (
          <Animated.View key={story.id} style={this.getStyle(index)}>
            <IStory {...{ story }} />
          </Animated.View>
        ))}
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: width * stories.length }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          decelerationRate="fast"
          horizontal
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black'
  }
});

export default IStories;
