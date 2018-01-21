/* @flow */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import CenterView from '../../../storybook/stories/CenterView';
import Icon from '.';

import { Color, IconPath } from '../../utils';

const IconStory = storiesOf('Icon', module);
IconStory.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);
IconStory.addDecorator(withKnobs);
IconStory.add('default', () => {
  return (
    <Icon onPress={action('clicked-icon')} color={Color.RED} size={40} svgPath={IconPath.STAR} />
  );
});

export default IconStory;
