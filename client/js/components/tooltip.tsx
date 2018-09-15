import {Popup} from 'react-map-gl';
import * as React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

const createParamList = (properties: {[key: string]: string}) =>
  Object.keys(properties).map(key => {
    return (
      <TableRow key={`${key}Row`}>
        <TableCell key={`${key}Cell`}>{key}</TableCell>
        <TableCell key={`{${key}Val`}>{properties[key]}</TableCell>
      </TableRow>
    );
  });

export const Tooltip = (
  isPopupOpen: boolean,
  latitude: number,
  longitude: number,
  properties: {[key: string]: string},
  dispatchClosePopup: () => void,
) => {
  if (!isPopupOpen || Object.keys(properties).length === 0) return;

  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      anchor="top"
      onClose={() => dispatchClosePopup()}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{createParamList(properties)}</TableBody>
      </Table>
    </Popup>
  );
};
