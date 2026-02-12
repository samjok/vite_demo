import { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import NavigationDrawer from "../../components/NavigationDrawer";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Grid container>
      <NavigationBar toggleMenu={toggleDrawer} />
      <NavigationDrawer toggleMenu={toggleDrawer} open={open} />
      <LoginForm />
    </Grid>
  );
}
