import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');

class ImageContainer extends Component {
  state = {};
  render() {
    const { image, title, translateX } = this.props;

    const animatedStyle = {
      transform: [{ translateX }]
    };

    return (
      <View style={styles.container}>
        <Animated.Image
          source={{ uri: image }}
          style={[styles.image, animatedStyle]}
          resizeMode="cover"
        />

        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <View style={styles.textWrap}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  center: {
    justifyContent: 'center'
  },
  textWrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10
  },
  title: {
    backgroundColor: 'transparent',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  }
});

export default ImageContainer;
