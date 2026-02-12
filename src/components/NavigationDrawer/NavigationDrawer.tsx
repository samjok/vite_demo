import * as React from "react";
import NavigationBar from "../NavigationBar";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Grid, Typography } from "@mui/material";
import { COLOR_MAIN_LIGHT } from "../../theme/colors";

type NavigationDrawerProps = {
  toggleMenu: (newOpen: boolean) => () => void;
  open: boolean;
};

export default function NavigationDrawer({
  toggleMenu,
  open,
}: NavigationDrawerProps) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu(false)}>
      <List>
        {["Page 1", "Page 2", "Page 3"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key={"settings"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={toggleMenu(false)}
      hideBackdrop={true}
      sx={{ backgroundColor: COLOR_MAIN_LIGHT }}
    >
      {DrawerList}
    </Drawer>
  );
}
