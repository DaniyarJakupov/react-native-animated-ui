/* @flow */
import * as React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

type P = {
  cards: Array<{ name: string, color: string, price: string }>
};

type S = {
  y: Animated.Value
};

const { height } = Dimensions.get('window');
const cardHeight = 250;
const cardTitle = 45;
const cardPadding = 10;

class ScrollDeck extends React.Component<P, S> {
  state = {
    y: new Animated.Value(0)
  };

  render() {
    const { y } = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {this.props.cards.map((card, i) => {
              const inputRange = [-cardHeight, 0];
              const outputRange = [cardHeight * i, (cardHeight - cardTitle) * -i];
              if (i > 0) {
                inputRange.push(cardPadding * i);
                outputRange.push((cardHeight - cardPadding) * -i);
              }

              const translateY = y.interpolate({
                inputRange,
                outputRange,
                extrapolateRight: 'clamp'
              });

              return (
                <Animated.View key={card.name} style={{ transform: [{ translateY }] }}>
                  <View style={[styles.card, { backgroundColor: card.color }]} />
                </Animated.View>
              );
            })}
          </View>

          <Animated.ScrollView
            scrollEventThrottle={16}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: this.state.y
                    }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 15
  },
  container: {
    flex: 1
  },
  card: {
    height: cardHeight,
    borderRadius: 10
  },
  content: {
    height: height * 2
  }
});

export default ScrollDeck;
