import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { IoLogOut, IoLogOutOutline }  from "react-icons/io5";

// Vision UI Dashboard React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

import { useUserActions } from '_actions/user.actions';

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Vision UI Dashboard React context
import {
  useVisionUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";


export default function DashboardNavbar({ absolute, light, isMini, setSymbol, symbol, collections, historyInterval, setHistoryInterval }) {
  
  const userActions = useUserActions();
  
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  const [selectedSymbol, setSelectedSymbol] = useState(symbol);
  const [selectedSymbolName, setSelectedSymbolName] = useState(symbol);
  const [openSymbol, setOpenSymbol] = useState(false);
  const [openInterval, setOpenInterval] = useState(false);
  const [selectMenu, setSelectMenu] = useState([]);

  const [localInterval, setLocalInterval] = useState(1);

  const intervalsMenu = {
    1: <MenuItem value="1">{"1m"}</MenuItem>,
    5: <MenuItem value="5">{"5m"}</MenuItem>,
    15: <MenuItem value="15">{"15m"}</MenuItem>,
    30: <MenuItem value="30">{"30m"}</MenuItem>,
    60: <MenuItem value="60">{"1h"}</MenuItem>,
    1440: <MenuItem value="1440">{"24h"}</MenuItem>
  }

  const handleIntervalChange = (event) => {
    setLocalInterval(event.target.value)
    setHistoryInterval(event.target.value)
  }

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
    setSelectedSymbol(event.target.value)
    setSelectedSymbolName(event.target.label)
  };



  useEffect(() => {
    if (collections && collections.length > 0) {
      const menu = collections.map((el, idx) => <MenuItem value={el.symbol}>{el.name}</MenuItem>);

      setSelectMenu(menu);
    }
  }, [collections])

  useEffect(() => {
   

    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleLogout = () => userActions.logout();

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="text"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <VuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          {/* <VuiTypography
            variant="button"
            fontWeight="medium"
            color={light ? "white" : "dark"}
          >
            {`Collection: ${symbol}`}
          </VuiTypography> */}
        </VuiBox>
        {isMini ? null : (
          <VuiBox sx={(theme) => navbarRow(theme, { isMini })}>
            <VuiBox pr={1}>
                <FormControl sx={{ minWidth: 60 }}>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openInterval}
                    onClose={ () => setOpenInterval(false) }
                    onOpen={ () => setOpenInterval(true) }
                    value={ intervalsMenu[localInterval].props.value }
                    label={ intervalsMenu[localInterval].props.children }
                    defaultValue={""} 
                    onChange={handleIntervalChange}
                  >
                      {Object.values(intervalsMenu)}
                  </Select>
                </FormControl>
            </VuiBox>
            <VuiBox pr={1}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  {/* <InputLabel id="demo-controlled-open-select-label">Symbol</InputLabel> */}
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openSymbol}
                    onClose={() => setOpenSymbol(false)}
                    onOpen={() => setOpenSymbol(true)}
                    value={selectedSymbol}
                    label={selectedSymbolName}
                    defaultValue="" 
                    onChange={handleSymbolChange}
                  >
                    {selectMenu}
                  </Select>
                </FormControl>
            </VuiBox>
            {/* <VuiBox pr={1}>
              <VuiInput
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
                sx={({ breakpoints }) => ({
                  [breakpoints.down("sm")]: {
                    maxWidth: "80px",
                  },
                  [breakpoints.only("sm")]: {
                    maxWidth: "80px",
                  },
                  backgroundColor: "info.main !important",
                })}
              />
            </VuiBox> */}
            <VuiBox color={light ? "white" : "inherit"}>
              {/* <Link to="/authentication/sign-in">
                <IconButton sx={navbarIconButton} size="small">
                  <Icon
                    sx={({ palette: { dark, white } }) => ({
                      color: light ? white.main : dark.main,
                    })}
                  >
                    account_circle
                  </Icon>
                  <VuiTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    Sign in
                  </VuiTypography>
                </IconButton>
              </Link> */}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={"text-white"}>{miniSidenav ? "menu_open" : "menu"}</Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleLogout}
              >
                <Icon>settings</Icon>
              </IconButton> */}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleLogout}
              >
                <IoLogOutOutline size="28px" color="inherit"/>
              </IconButton>
              {renderMenu()}
            </VuiBox>
          </VuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  historyInterval: 1,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};
