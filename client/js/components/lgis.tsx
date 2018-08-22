import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import {ChevronLeft, Menu} from '@material-ui/icons';
import classNames from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux'
import Map from './map';
import {State} from '../reducers/index';
import {ToggleToolbarAction, toggleToolbar} from '../actions/index';

const drawerWidth = 480;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appFrame: {
      height: '100%',
      zIndex: 1,
      overflow: 'hidden',
      position: 'absolute',
      display: 'flex',
      width: '100%',
    },
    appBar: {
      position: 'absolute',
      backgroundColor: '#fff44f',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    'content-left': {
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    textfield: {
      padding: 10,
    },
    button: {
      margin: theme.spacing.unit * 3,
    },
  });

interface AppProps {
  classes: any;
  theme: any;
}

interface AppState {
  open: boolean;
}

class App extends React.Component<AppProps, AppState> {
  public state = {
    open: false,
  };

  public mapProps = {
    settings: '',
    table: '',
  };

  private map = React.createRef<Map>();

  public constructor(props: any) {
    super(props);
  }

  public handleDrawerOpen = () => this.setState({open: true});

  public handleDrawerClose = () => this.setState({open: false});

  public handleSettingFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    (this.mapProps.settings = e.target.value);

  public handleTableFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    (this.mapProps.table = e.target.value);

  public handleButtonClick = () => {
    if (this.map.current) {
      this.map.current.loadData(this.mapProps.settings, this.mapProps.table);
    }
  };
  public render() {
    const {classes, theme} = this.props;
    const {open} = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}>
            <Toolbar disableGutters={!open}>
              <IconButton
                color="primary"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  open && classes.hide,
                )}>
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
              <IconButton onClick={this.handleDrawerClose}>
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
              onChange={this.handleSettingFieldChange}
            />
            <TextField
              id="lgis-table"
              className={classes.textfield}
              label="table"
              defaultValue="my_schema.my_table"
              multiline={true}
              rows="8"
              onChange={this.handleTableFieldChange}
            />
            <Button
              variant="contained"
              className={classes.button}
              onClick={this.handleButtonClick}>
              Show
            </Button>
          </Drawer>
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: open,
            })}>
            <div className={classes.drawerHeader} />
            <Map
              settings={this.mapProps.settings}
              table={this.mapProps.table}
              ref={this.map}
            />
          </main>
        </div>
      </div>
    );
  }
}

export const Lgis = withStyles(styles, {withTheme: true})<typeof styles>(App);

export const mapStateToProps = (state: State) => {
  return {value: state.app.open};
};

export const mapDispatchToProps = (dispatch: Dispatch<ToggleToolbarAction>) => {
  return {
    dispatch1: () => {
      dispatch(toggleToolbar());
    },
  };
};

export const LGIS = connect(mapStateToProps, mapDispatchToProps)(Lgis);
