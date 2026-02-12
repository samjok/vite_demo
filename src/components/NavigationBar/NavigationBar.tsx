import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { COLOR_MAIN_PRIMARY } from "../../theme/colors";

type NavigationBarProps = {
  toggleMenu: (newOpen: boolean) => () => void;
};

export default function NavigationBar({ toggleMenu }: NavigationBarProps) {
  return (
    <IconButton
      onClick={toggleMenu(true)}
      size="large"
      edge="start"
      aria-label="menu"
      sx={{
        mr: 2,
        color: COLOR_MAIN_PRIMARY,
        position: "absolute",
        top: "10px",
        left: "30px",
      }}
    >
      <MenuIcon />
    </IconButton>
  );
}
