import { Outlet, Link } from "react-router-dom";

import { Box, AppBar, Button, ButtonGroup, Grid, Typography } from '@material-ui/core'



import Header from './images/Header.png'
import useStyles from './styles';

const Layout = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar} position='static' color="inherit" >
        <Box component="img" sx={{ justifyContent: "flex-end", minWidth: 250,  width: '30%' }} src={Header}></Box>
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