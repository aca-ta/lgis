import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  MenuItem,
  Toolbar,
  Typography,
  TextField,
} from '@material-ui/core';
import {ChevronLeft, Menu} from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {
  ActionTypes,
  toggleDrawer,
  inputSettings,
  inputTable,
  addLayer,
} from '../actions/toolbar';
import {RootState} from '../reducers';

interface ToolbarProps {
  classes: any;
  open: boolean;
  dispatchDrawerOpen: () => void;
  settings: string;
  dispatchInputSettings: (settings: string) => void;
  table: string;
  dispatchInputTable: (table: string) => void;
  dispatchAddLayer: (settings: string, table: string) => void;
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
    dispatchAddLayer,
  } = props;

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
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              dispatchDrawerOpen()
            }
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
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              dispatchDrawerOpen()
            }>
            <ChevronLeft />
          </IconButton>
        </div>
        <TextField
          id="lgis-settings"
          className={classes.textfield}
          label="settings"
          defaultValue={settings}
          multiline={true}
          rows="10"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatchInputSettings(e.target.value)
          }
        />
        <TextField
          id="lgis-table"
          className={classes.textfield}
          label="table"
          defaultValue={table}
          multiline={true}
          rows="8"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatchInputTable(e.target.value)
          }
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={(e: React.MouseEvent<HTMLElement>) =>
            dispatchAddLayer(settings, table)
          }>
          Show
        </Button>
      </Drawer>
    </div>
  );
};

export interface ToolbarState {
  open: boolean;
  settings: string;
  table: string;
}

const mapStateToProps = (state: RootState): ToolbarState => ({
  open: state.toolbar.open,
  settings: state.toolbar.settings,
  table: state.toolbar.table,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => ({
  dispatchDrawerOpen: () => {
    dispatch(toggleDrawer());
  },
  dispatchInputSettings: (settings: string) => {
    dispatch(inputSettings(settings));
  },
  dispatchInputTable: (table: string) => {
    dispatch(inputTable(table));
  },
  dispatchAddLayer: (settings: string, table: string) => {
    dispatch(addLayer(settings, table));
  },
});

export const LGISToolbar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LgisToolbar);
