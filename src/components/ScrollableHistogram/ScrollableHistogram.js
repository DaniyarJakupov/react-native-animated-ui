/* @flow */
import * as React from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import Waveform from './Waveform';

import waveform from './data/waveform.json';

type P = {};

type S = {
  x: Animated.Value
};

class ScrollableHistogram extends React.Component<P, S> {
  state = {
    x: new Animated.Value(0)
  };

  render() {
    const { x } = this.state;

    return (
      <View style={styles.root}>
        <View style={styles.progress}>
          <View>
            <Animated.ScrollView
              showsHorizontalScrollIndicator={false}
              bounces={false}
              scrollEventThrottle={16}
              horizontal
              onScroll={Animated.event([
                {
                  nativeEvent: {
                    contentOffset: { x }
                  }
                }
              ])}
            >
              <View style={{ flex: 1 }}>
                <Waveform primaryColor="white" secondaryColor="#e6d0bb" {...{ waveform }} />
                <View style={StyleSheet.absoluteFillObject}>
                  <Waveform
                    primaryColor="#e95f2a"
                    secondaryColor="#f5c19f"
                    progress={x}
                    {...{ waveform }}
                  />
                </View>
              </View>
            </Animated.ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e570e7',
    opacity: 0.5,
    justifyContent: 'flex-end'
  },
  progress: {
    flex: 0.5,
    justifyContent: 'center'
  }
});

export default ScrollableHistogram;
