import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Menu from '@material-ui/icons/Menu';
import * as classNames from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {
  ActionTypes,
  addLayer,
  inputSettings,
  inputTable,
  selectGeomType,
  toggleDrawer,
} from '../actions/toolbar';
import {loadMap, saveMap} from '../models/layer';
import {RootState} from '../reducers';

interface ToolbarProps {
  classes: any;
  open: boolean;
  dispatchDrawerOpen: (e: React.MouseEvent<HTMLElement>) => void;
  settings: string;
  dispatchInputSettings: (e: React.ChangeEvent<HTMLInputElement>) => void;
  table: string;
  geomType: string;
  dispatchInputTable: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dispatchSelectGeomType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dispatchAddLayer: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const LgisToolbar = (props: ToolbarProps) => {
  const {
    classes,
    open,
    dispatchDrawerOpen,
    settings,
    dispatchInputSettings,
    table,
    dispatchInputTable,
    geomType,
    dispatchSelectGeomType,
    dispatchAddLayer,
  } = props;

  const saveMapWrapper = (event: React.MouseEvent<HTMLElement>) => saveMap(settings, table, geomType);
  const loadMapWrapper = (event: React.MouseEvent<HTMLElement>) => loadMap("");

  return (
    <div>
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar disableGutters={!open}>
          <IconButton
            color="primary"
            aria-label="Open drawer"
            onClick={dispatchDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}>
            <Menu />
          </IconButton>
          <Typography variant="title" noWrap={true}>
            Lgis
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={dispatchDrawerOpen}>
            <ChevronLeft />
          </IconButton>
        </div>
        <TextField
          id="lgis-settings"
          className={classes.textfield}
          label="Settings"
          value={settings}
          multiline={true}
          rows="10"
          onChange={dispatchInputSettings}
        />
        <InputLabel shrink={true} htmlFor="geom-type-label-placeholder">
          Geometry type
        </InputLabel>
        <Select
          value={geomType}
          className={classes.selector}
          onChange={dispatchSelectGeomType}
          inputProps={{name: 'GeomType', id: 'geom-type'}}>
          <MenuItem value="point">Point</MenuItem>
          <MenuItem value="linestring">LineString</MenuItem>
          <MenuItem value="polygon">Polygon</MenuItem>
        </Select>
        <TextField
          id="lgis-table"
          className={classes.textfield}
          label="Table"
          value={table}
          multiline={true}
          rows="8"
          onChange={dispatchInputTable}
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={dispatchAddLayer}>
          Show
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={saveMapWrapper}>
          Save
        </Button>
      </Drawer>
    </div>
  );
};

export interface ToolbarState {
  open: boolean;
  settings: string;
  table: string;
  geomType: string;
}

const mapStateToProps = (state: RootState): ToolbarState => ({
  open: state.toolbar.open,
  settings: state.toolbar.settings,
  table: state.toolbar.table,
  geomType: state.toolbar.geomType,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  dispatchDrawerOpen: (e: React.MouseEvent<HTMLElement>) => {
    dispatch(toggleDrawer());
  },
  dispatchInputSettings: (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputSettings(e.target.value));
  },
  dispatchInputTable: (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputTable(e.target.value));
  },
  dispatchSelectGeomType: (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectGeomType(e.target.value));
  },
  dispatchAddLayer: (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(addLayer());
  },
});

export const LGISToolbar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LgisToolbar);
