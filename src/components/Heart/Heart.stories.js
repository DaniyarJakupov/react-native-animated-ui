/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import R from 'ramda';

import CenterView from '../../../storybook/stories/CenterView';
import Heart from '.';
import { Color } from '../../utils';

const colorOptions = R.invertObj(Color);

/* HeartStory */
const HeartStory = storiesOf('Heart', module);
HeartStory.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);
HeartStory.addDecorator(withKnobs);
HeartStory.add('default', () => {
  return (
    <Heart
      color={select('color', colorOptions, Color.PURPLE)}
      explosion={boolean('explosion', true)}
      onPress={action('clicked-Heart')}
    />
  );
});

export default HeartStory;
