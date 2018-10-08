import {Popup} from 'react-map-gl';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import * as React from 'react';

const createParamList = (properties: {[key: string]: string}) =>
  Object.keys(properties).map(key => {
    return (
      <TableRow key={`${key}Row`}>
        <TableCell key={`${key}Cell`}>{key}</TableCell>
        <TableCell key={`{${key}Val`}>{properties[key]}</TableCell>
      </TableRow>
    );
  });
// FIXME: cannot scroll with mousewheel.
const StyledPopup = styled(Popup)`
  &&& {
    max-height: 300px;
    overflow-y: auto;
    user-select: text;
  }
`;

export const Tooltip = (
  latitude: number,
  longitude: number,
  properties: {[key: string]: string},
  dispatchClosePopup: () => void,
) => {
  if (Object.keys(properties).length === 0) {
    return;
  }

  const closePopup = () => dispatchClosePopup();

  return (
    <StyledPopup
      latitude={latitude}
      longitude={longitude}
      anchor="top"
      closeOnClick={false}
      captureScroll={true}
      onClose={closePopup}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{createParamList(properties)}</TableBody>
      </Table>
    </StyledPopup>
  );
};
