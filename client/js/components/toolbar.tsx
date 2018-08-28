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
import {State} from '../reducers';

interface ToolbarProps {
  classes: any;
  open: boolean;
  dispatchDrawerOpen: (open: boolean) => void;
  settings: string;
  dispatchInputSettings: (settings: string) => void;
  table: string;
  dispatchInputTable: (table: string) => void;
  dispatchAddLayer: (settings: string, table: string) => void;
}

interface toolbarState {} //TODO: delete later.

class LgisToolbar extends React.Component<ToolbarProps, toolbarState> {
  public render() {
    const {
      classes,
      open,
      dispatchDrawerOpen,
      settings,
      dispatchInputSettings,
      table,
      dispatchInputTable,
      dispatchAddLayer,
    } = this.props;

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
                this.props.dispatchDrawerOpen(this.props.open)
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
                dispatchDrawerOpen(this.props.open)
              }>
              <ChevronLeft />
            </IconButton>
          </div>
          <TextField
            id="lgis-settings"
            className={classes.textfield}
            label="settings"
            defaultValue="{&quot;host&quot;: &quot;127.0.0.1&quot;, &quot;db&quot;: &quot;mydatabase&quot;}"
            multiline={true}
            rows="10"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatchInputSettings(this.props.settings)
            }
          />
          <TextField
            id="lgis-table"
            className={classes.textfield}
            label="table"
            defaultValue="my_schema.my_table"
            multiline={true}
            rows="8"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatchInputTable(this.props.table)
            }
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={dispatchAddLayer(settings, table)}>
            Show
          </Button>
        </Drawer>
      </div>
    );
  }
}

export interface ToolbarState {
  open: boolean;
  settings: string;
  table: string;
  mapStyle: any;
}

const mapStateToProps = (state: State) => {
  return {
    open: state.toolbar.open,
    settings: state.toolbar.settings,
    table: state.toolbar.table,
    mapStyle: state.map.mapStyle,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) => {
  return {
    dispatchDrawerOpen: (open: boolean) => {
      dispatch(toggleDrawer(open));
    },
    dispatchInputSettings: (settings: string) => {
      dispatch(inputSettings(settings));
    },
    dispatchInputTable: (table: string) => {
      dispatch(inputTable(table));
    },
    dispatchAddLayer: (settings: string, table: string, mapStyle: any) => {
      dispatch(addLayer(settings, table, mapStyle));
    },
  };
};

export const LGISToolbar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LgisToolbar);
