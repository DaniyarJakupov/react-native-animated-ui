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
  stories = [];

  state = {
    x: new Animated.Value(0)
  };

  constructor(props: Props) {
    super(props);
    this.stories = props.stories.map(() => React.createRef());
  }

  componentDidMount() {
    this.state.x.addListener(() =>
      this.stories.forEach((story, index) => {
        const { x } = this.state;
        const offset = width * index;
        const inputRange = [offset - width, offset + width];

        const translateX = x
          .interpolate({
            inputRange,
            outputRange: [width / 2, -width / 2],
            extrapolate: 'clamp'
          })
          .__getValue();

        const rotateY = x
          .interpolate({
            inputRange,
            outputRange: [`${A}rad`, `-${A}rad`],
            extrapolate: 'clamp'
          })
          .__getValue();

        const parsed = parseFloat(rotateY.substring(0, rotateY.indexOf('rad'), 10));
        const alpha = Math.abs(parsed);
        const beta = A - alpha;
        const gamma = Math.PI - alpha - beta;
        const y = width / 2 - ((width / 2) * Math.sin(beta)) / Math.sin(gamma);
        const translateX2 = parsed > 0 ? y : -y;

        const style = {
          transform: [
            { perspective: PERSPECTIVE },
            { translateX },
            { rotateY },
            { translateX: translateX2 }
          ]
        };

        story.current.setNativeProps({ style });
      })
    );
  }

  render(): React.Node {
    const { stories } = this.props;

    const { x } = this.state;

    return (
      <View style={styles.root}>
        {stories.map((story, index) => (
          <Animated.View ref={this.stories[index]} key={story.id} style={StyleSheet.absoluteFill}>
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
