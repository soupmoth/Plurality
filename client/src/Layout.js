import { Outlet, Link } from "react-router-dom";

import { Container, AppBar, Button, ButtonGroup, Grid, Typography } from '@material-ui/core'



import Header from './images/Header.png'
import useStyles from './styles';

const Layout = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar} position='static' color="inherit">
        <img className={classes.image} src={Header} alt="plurality" height="125" />
        <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
          <Button color="primary" size="small" component={Link} to="/"> Home </Button>
          <Button color="primary" size="small" component={Link} to="/simulation"> Simulation </Button>
          <Button color="primary" size="small" component={Link} to="/articles"> Articles </Button>
          <Button color="primary" size="small" component={Link} to="/about"> About</Button>
        </ButtonGroup>
      </AppBar>

      <Outlet />
    </>
  )
};

export default Layout;