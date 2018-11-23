// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;

type State = {
  currentIndex: number
};
type Props = {
  data: Array<{ id: string, uri: string }>,
  renderNoMoreCards?: Function
};

export default class App extends Component<Props, State> {
  position: Animated.Value;
  rotate: Animated.Value;
  rotateAndTranslate: Animated.Value;
  likeOpacity: Animated.Value;
  dislikeOpacity: Animated.Value;
  nextCardOpacity: Animated.Value;
  nextCardScale: Animated.Value;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentIndex: 0
    };
    this.position = new Animated.ValueXY();

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: 0 });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: 0 }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 });
            });
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });
  }

  renderCards = () => {
    if (this.state.currentIndex >= this.props.data.length) {
      if (this.props.renderNoMoreCards) {
        return this.props.renderNoMoreCards();
      }
      return (
        <View style={[styles.noMoreWrapper]}>
          <Text>No more cards</Text>
        </View>
      );
    }

    return this.props.data
      .map((item, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i == this.state.currentIndex) {
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.id}
              style={[this.rotateAndTranslate, styles.imageWrapper]}
            >
              <Animated.View style={[styles.likeTextWrapper, { opacity: this.likeOpacity }]}>
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>

              <Animated.View style={[styles.dislikeTextWrapper, { opacity: this.dislikeOpacity }]}>
                <Text style={styles.dislikeText}>NOPE</Text>
              </Animated.View>

              <Image style={styles.image} source={{ uri: item.uri }} />
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[
              styles.imageWrapper,
              {
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }]
              }
            ]}
          >
            <Animated.View style={styles.likeTextWrapper}>
              <Text style={styles.likeText}>LIKE</Text>
            </Animated.View>

            <Animated.View style={styles.dislikeTextWrapper}>
              <Text style={styles.dislikeText}>NOPE</Text>
            </Animated.View>

            <Image style={styles.image} source={{ uri: item.uri }} />
          </Animated.View>
        );
      })
      .reverse();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }} />
        <View style={{ flex: 1 }}>{this.renderCards()}</View>
        <View style={{ height: 60 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  },
  imageWrapper: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute'
  },
  dislikeText: {
    borderWidth: 1,
    borderColor: 'crimson',
    color: 'crimson',
    fontSize: 32,
    fontWeight: '800',
    padding: 10
  },
  dislikeTextWrapper: {
    opacity: 0,
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1000
  },
  likeText: {
    borderWidth: 1,
    borderColor: 'lightgreen',
    color: 'lightgreen',
    fontSize: 32,
    fontWeight: '800',
    padding: 10
  },
  likeTextWrapper: {
    opacity: 0,
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 1000
  },
  noMoreWrapper: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  }
});
