import React, { FC } from 'react';
import sun from './img/sunny-light.svg';

import styled from 'styled-components';

const SpinnerBody = styled.div`
  grid-column: 2/3;
  justify-self: center;
  align-self: start;
`;

export const Spinner: FC = () => {
  return (
    <SpinnerBody>
      <img src={sun} alt="loading" />
    </SpinnerBody>
  );
};
