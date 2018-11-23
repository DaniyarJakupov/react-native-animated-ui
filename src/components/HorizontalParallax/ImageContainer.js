/* @flow */
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

const { width, height } = Dimensions.get('window');

type Props = {
  onFocused: Function,
  image: string,
  title: string,
  translateX: Animated.Value
};

type State = {
  scale: Animated.Value
};

class ImageContainer extends React.Component<Props, State> {
  bgFadeInterpolate: Animated.Value;
  textFade: Animated.Value;
  calloutTranslate: Animated.Value;

  state = {
    scale: new Animated.Value(1)
  };

  componentWillMount() {
    this.bgFadeInterpolate = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: ['rgba(0,0,0,.6)', 'rgba(0,0,0,0)']
    });

    this.textFade = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [0, 1]
    });

    this.calloutTranslate = this.state.scale.interpolate({
      inputRange: [0.9, 1],
      outputRange: [0, 150]
    });
  }

  handlePress = () => {
    if (this.props.focused) {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300
      }).start(() => this.props.onFocused(false));
      return;
    }

    Animated.timing(this.state.scale, {
      toValue: 0.9,
      duration: 300
    }).start(() => this.props.onFocused(true));
  };

  render(): React.Node {
    const { image, title, translateX } = this.props;

    const animatedStyle = {
      transform: [{ translateX }, { scale: this.state.scale }]
    };

    const bgFadeStyle = {
      backgroundColor: this.bgFadeInterpolate
    };
    const textFadeStyle = {
      opacity: this.textFade
    };
    const calloutStyle = {
      transform: [{ translateY: this.calloutTranslate }]
    };

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.container}>
            <Animated.Image
              source={{ uri: image }}
              style={[styles.image, animatedStyle]}
              resizeMode="cover"
            />
          </View>

          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animated.View style={[StyleSheet.absoluteFill, styles.center, bgFadeStyle]}>
              <Animated.View style={[styles.textWrap, textFadeStyle]}>
                <Text style={styles.title}>{title}</Text>
              </Animated.View>
            </Animated.View>
          </TouchableWithoutFeedback>

          <Animated.View style={[styles.callout, calloutStyle]}>
            <View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </Animated.View>
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
  },
  callout: {
    height: 150,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});

export default ImageContainer;
