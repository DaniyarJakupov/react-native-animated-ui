import React, { Component } from 'react';
import { View, Animated, Image, StyleSheet, Dimensions, PanResponder, Text } from 'react-native';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.4 * width;
const SWIPE_OUT_DURATION = 250;

const DATA = [
  {
    image: 'https://i.imgur.com/qFZmyFD.jpg',
    title: 'Theater'
  },
  {
    image: 'https://i.imgur.com/sjFFcOF.jpg',
    title: 'Nature'
  },
  {
    image: 'https://i.imgur.com/m6Z5NAw.jpg',
    title: 'Bar'
  },
  {
    image: 'https://i.imgur.com/PY56L1n.jpg',
    title: 'Park'
  }
];

class SwipeDeck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0
    };

    this.position = new Animated.ValueXY();

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this.position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.rotate = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: ['-20deg', '0deg', '20deg'],
      extrapolate: 'clamp'
    });
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
  }

  onSwipeComplete = () => {
    this.setState(
      prevState => ({ currentIndex: prevState.currentIndex + 1 }),
      () => {
        this.position.setValue({ x: 0, y: 0 });
      }
    );
  };

  forceSwipe = direction => {
    const x = direction === 'right' ? width : -width;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  };

  resetPosition = () => {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
      friction: 4
    }).start();
  };

  swipeCard = () => ({
    ...this.position.getLayout(),
    transform: [{ rotate: this.rotate }]
  });

  renderCards = () => {
    const cards = DATA.map((card, i) => {
      if (i < this.state.currentIndex) {
        return null;
      }
      if (i === this.state.currentIndex) {
        return (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[styles.animatedContent, this.swipeCard()]}
            key={card.title}
          >
            <Animated.View style={[styles.textWrapperRight, { opacity: this.likeOpacity }]}>
              <Text style={[styles.text]}>LIKE</Text>
            </Animated.View>

            <Animated.View style={[styles.textWrapperLeft, { opacity: this.dislikeOpacity }]}>
              <Text
                style={[
                  styles.text,
                  {
                    color: 'crimson',
                    borderColor: 'crimson'
                  }
                ]}
              >
                NOPE
              </Text>
            </Animated.View>
            <Image source={{ uri: card.image }} style={styles.image} resizeMode="cover" />
          </Animated.View>
        );
      }

      return (
        <Animated.View
          style={[
            styles.animatedContent,
            { opacity: this.nextCardOpacity, transform: [{ scale: this.nextCardScale }] }
          ]}
          key={card.title}
        >
          <Image source={{ uri: card.image }} style={styles.image} resizeMode="cover" />
        </Animated.View>
      );
    });

    return cards.reverse();
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header} />
        <View style={styles.content}>{this.renderCards()}</View>
        <View style={styles.footer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  header: {
    height: 60
  },
  content: {
    flex: 1
  },
  footer: {
    height: 60
  },
  animatedContent: {
    height: height - 120,
    width,
    padding: 10,
    position: 'absolute'
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 20
  },
  text: {
    borderWidth: 1,
    color: 'lightgreen',
    borderColor: 'lightgreen',
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10
  },
  textWrapperRight: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 50,
    left: 40,
    zIndex: 999,
    transform: [{ rotate: '-30deg' }]
  },
  textWrapperLeft: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 50,
    right: 40,
    zIndex: 999,
    transform: [{ rotate: '30deg' }]
  }
});

export default SwipeDeck;
