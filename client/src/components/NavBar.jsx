import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
  {
    name:"Home",
    path:"/"
  },
  {
    name:"services",
    path:"/services"
  },

  {
    name:"gallery",
    path:"/gallery"
  },  
  {
    name:"location",
    path:"/location"
  },  
  {
    name:"contact",
    path:"/contact"
  },
  {
    name:"book now",
    path:"/booking"
  }
];

function NavBar(props) {
  let location = useLocation()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Sheger Lounge
      </Typography>
      <Divider />
      <Box >
      {navItems.map((item) => (
                  <Button onClick={e=>{
                    navigate(item.path)}} 
                    sx={{ 
                      display:"block",
                      fontSize:"13px",
                      color:location.pathname == item.path?"#1d50bf":"black",
                      // backgroundColor: item.name=="book now" ?"#1d50bf":"",
                      
                      }}>
                     {item.name}
                  </Button>
                 
              ))}
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      
      <AppBar component="nav" sx={{backgroundColor:"white !important",boxShadow:"1px 1px 3px 1px #D3D3D3" }}>
      <Box sx={{bgcolor:"#5A5A5A", textAlign:"left",px:2 ,py:1,display:"flex"}}>
      <LocalPhoneIcon sx={{fontSize:"18px"}}/> <Typography sx={{px:2,fontSize:"12px"}}> +251945818635</Typography>
      <EmailIcon sx={{fontSize:"18px"}}/> <Typography sx={{px:2,fontSize:"12px"}}> shegerlounge@gmail.com</Typography>
        
        </Box>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{color:"#1d50bf"}} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            color={"black"}
            sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
          >
            SHEGER LOUNGE
          </Typography>
          <Box sx={{ flexGrow: 1}} ></Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navItems.map((item) => (
                  <Button onClick={e=>{
                    navigate(item.path)}} 
                    sx={{ 
                      fontSize:"13px",
                      color:location.pathname == item.path?"#1d50bf":"black",
                      // backgroundColor: item.name=="book now" ?"#1d50bf":"",
                      
                      }}>
                     {item.name}
                  </Button>
                 
              ))}
            
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />

      </Box>
    </Box>
  );
}

NavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBar;