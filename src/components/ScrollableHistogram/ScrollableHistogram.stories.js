/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';

import ScrollableHistogram from '.';

/* ScrollableHistogram */
const ScrollableHistogramStory = storiesOf('ScrollableHistogram', module);
ScrollableHistogramStory.addDecorator(withKnobs);
ScrollableHistogramStory.add('default', () => {
  return <ScrollableHistogram />;
});

export default ScrollableHistogramStory;
