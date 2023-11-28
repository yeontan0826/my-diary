import React from 'react';
import { Typography } from '../typography';

export const HeaderTitle = (props) => {
  return (
    <Typography style={props.style} fontSize={18} fontWeight={500}>
      {props.title}
    </Typography>
  );
};
