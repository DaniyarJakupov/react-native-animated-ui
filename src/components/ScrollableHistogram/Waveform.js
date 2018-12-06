// @flow
import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import Svg, { Rect, Defs, ClipPath } from 'react-native-svg';

type P = {
  primaryColor: string,
  secondaryColor: string,
  progress?: Animated.Value,
  waveform: { width: number, height: number, samples: number[] }
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const barWidth = 4;
const barMargin = 1;
const waveformMargin = 1;
const { width: wWidth } = Dimensions.get('window');
const offset = wWidth / 2;

class Waveform extends React.PureComponent<P> {
  render() {
    const { waveform, primaryColor, secondaryColor, progress } = this.props;
    const height = waveform.height + 0.61 * waveform.height + waveformMargin;
    const width = waveform.width * (barWidth + barMargin) + offset;
    const x = progress
      ? progress.interpolate({
          inputRange: [0, width - wWidth - offset, width - wWidth],
          outputRange: [`${-width + offset}`, `${-wWidth}`, '0']
        })
      : 0;

    return (
      <Svg {...{ height, width }}>
        <Defs>
          <ClipPath id="progress">
            <AnimatedRect x={x} {...{ height, width }} />
          </ClipPath>
        </Defs>
        {waveform.samples.map((sample, key) => (
          <Rect
            clipPath="url(#progress)"
            width={barWidth}
            height={sample}
            fill={primaryColor}
            x={key * (barWidth + barMargin) + offset}
            y={waveform.height - sample}
            {...{ key }}
          />
        ))}
        {waveform.samples.map((sample, key) => (
          <Rect
            clipPath="url(#progress)"
            width={barWidth}
            height={sample * 0.61}
            fill={secondaryColor}
            x={key * (barWidth + barMargin) + offset}
            y={waveform.height + waveformMargin}
            {...{ key }}
          />
        ))}
      </Svg>
    );
  }
}

export default Waveform;
