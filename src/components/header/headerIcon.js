import React from 'react';
import { Button } from '../button';
import { Icon } from '../icon';

export const HeaderIcon = (props) => {
  return (
    <Button onPress={props.onPress}>
      <Icon name={props.name} size={28} color={props.color} />
    </Button>
  );
};
