import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { withOktaAuth } from '@okta/okta-react';

const styles = theme => ({
  root: {
    width: '100%',
  },
  MuiAppBar: {
    alignItems: 'center'
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
    search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
    inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  toolbar: {
    alignItems: 'center'
  }
});

const SearchBar = (props) => {
  const { classes, oktaAuth, onSearch } = props;
  const logout = async(e) => {
    e.preventDefault();
    await oktaAuth.signOut();
  };


  return (
      <div className={classes.root}>
        <AppBar position="static" style={{alignItems: 'center'}}>
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search for your OOS project on GitHub + Press Enter"
                onKeyDown={onSearch}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <Button onClick={logout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
    oktaAuth: PropTypes.object,
    onSearch: PropTypes.func,
};

export const SearchBarWithStylesAndOktaAuth = withStyles(styles)(withOktaAuth(SearchBar));