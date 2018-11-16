/* @flow */
import * as React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

import IStory from './IStory';

const { width } = Dimensions.get('window');
const PERSPECTIVE = 350;
const A = Math.atan(PERSPECTIVE / width / 2);

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
      outputRange: [width / 2, -width / 2],
      extrapolate: 'clamp'
    });

    // Rotation calculated based on Perspective
    const rotateY = x.interpolate({
      inputRange,
      outputRange: [`${A}rad`, `-${A}rad`],
      extrapolate: 'clamp'
    });

    const translateX1 = x.interpolate({
      inputRange,
      outputRange: [width / 2, -width / 2],
      extrapolate: 'clamp'
    });

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective: PERSPECTIVE },
        { translateX },
        { rotateY },
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
