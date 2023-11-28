import React from 'react';
import styled from 'styled-components/native';

export const Divider = () => {
  return <Line />;
};

const Line = styled.View`
  align-items: stretch;
  margin-left: 24px;
  margin-right: 24px;
  border-width: 0.5px;
  border-color: gray;
`;
