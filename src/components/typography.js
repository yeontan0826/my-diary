import React from 'react';
import { Text as RNText } from 'react-native';
import PropTypes from 'prop-types';

export const Typography = (props) => {
  return (
    <RNText
      style={[
        props.style,
        {
          color: props.color,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
        },
      ]}
      numOfLines={props.numOfLines}
    >
      {props.children}
    </RNText>
  );
};

Typography.prototype = {
  color: PropTypes.string,
  fontsize: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};
