import React, { FC } from 'react';

import styled from 'styled-components';

const ErrorBody = styled.p`
  grid-column: 2/3;
  justify-self: center;
  align-self: start;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  color: white;
`;

export const ErrorIndicator: FC<IErrorIndicator> = ({ errorMessage }) => {
  return <ErrorBody>{errorMessage}</ErrorBody>;
};

interface IErrorIndicator {
  errorMessage?: string | null;
}
