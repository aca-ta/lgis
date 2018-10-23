import {createStyles, withStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import * as classNames from 'classnames';
import * as React from 'react';
import {MAP} from './map';
import {LGISToolbar} from './toolbar';

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
    selector: {
      padding: 10,
    },
    button: {
      margin: theme.spacing.unit * 3,
    },
  });

interface AppProps {
  classes: any;
}

const App = (props: AppProps) => {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <LGISToolbar classes={classes} />
        <main
          className={classNames(
            classes.content,
            classes['content-left'],
            classes.contentShift,
          )}>
          <div className={classes.drawerHeader} />
          <MAP />
        </main>
      </div>
    </div>
  );
};

export const Lgis = withStyles(styles, {withTheme: true})<typeof styles>(App);
