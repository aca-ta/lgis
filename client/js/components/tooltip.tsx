import {Popup} from 'react-map-gl';
import * as React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

export const Tooltip = (
  isPopupOpen: boolean,
  latitude: number,
  longitude: number,
  properties: {[key: string]: string},
  dispatchClosePopup: () => void,
) => {
  if (Object.keys(properties).length === 0) return;
  const ParamList = Object.keys(properties).map(key => {
    return (
      <TableRow key={`${key}Row`}>
        <TableCell key={`${key}Cell`}>{key}</TableCell>
        <TableCell key={`{${key}Val`}>{properties[key]}</TableCell>
      </TableRow>
    );
  });

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
        <TableBody>{ParamList}</TableBody>
      </Table>
    </Popup>
  );
};
