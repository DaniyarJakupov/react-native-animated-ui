import * as React from 'react';
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';

type Props = {
  id: string,
  source: string,
  user: string
};

class IStory extends React.Component<Props> {
  render(): React.Node {
    const {
      story: { source }
    } = this.props;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.wrapper}>
          <Image style={styles.image} source={{ uri: source }} />
        </View>

        <View style={styles.footer} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default IStory;
