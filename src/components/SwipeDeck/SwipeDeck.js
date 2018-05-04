import React, { Component } from 'react';
import {
  View,
  Animated,
  Image,
  StyleSheet,
  Dimensions,
  PanResponder,
  LayoutAnimation,
  UIManager
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.3 * width;
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
          // this.forceSwipe('right');
          console.log('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // this.forceSwipe('left');
          console.log('left');
        } else {
          this.resetPosition();
        }
      }
    });
  }

  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.position.setValue({ x: 0, y: 0 });
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? width : -width;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards = () => {
    const cards = DATA.map((card, i) => {
      if (i < this.state.currentIndex) {
        return null;
      }
      if (i === this.state.currentIndex) {
        return (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[styles.animatedContent, this.getCardStyle()]}
            key={card.title}
          >
            <Image source={{ uri: card.image }} style={styles.image} resizeMode="cover" />
          </Animated.View>
        );
      }

      return (
        <Animated.View style={[styles.animatedContent]} key={card.title}>
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
  }
});

export default SwipeDeck;
