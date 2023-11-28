import React from 'react';
import styled from 'styled-components/native';

export const HeaderGroup = (props) => {
  return <GroupContainer>{props.children}</GroupContainer>;
};

const GroupContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
