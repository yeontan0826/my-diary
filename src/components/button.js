import React from 'react';
import { Pressable } from 'react-native';

export const Button = (props) => {
  return (
    <Pressable
      style={props.style}
      onPressIn={props.onPressIn}
      onPressOut={props.onPressOut}
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      hitSlop={props.hitSlop ?? { left: 0, right: 0, top: 0, bottom: 0 }}
    >
      {props.children}
    </Pressable>
  );
};
