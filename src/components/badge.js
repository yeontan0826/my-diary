import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from './typography';

export const Badge = (props) => {
  return (
    <View>
      <View>
        {props.children}
        <BadgeWrapper>
          <Typography fontSize={10} color={'white'}>
            N
          </Typography>
        </BadgeWrapper>
      </View>
    </View>
  );
};

const BadgeWrapper = styled.View`
  position: absolute;
  right: -5px;
  top: -5px;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: red;
`;
