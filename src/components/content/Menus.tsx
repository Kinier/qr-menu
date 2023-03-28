import { Grid,Fab, Zoom, SxProps } from "@mui/material";
import { AddTwoTone } from "@mui/icons-material";
import CardsList from "../lists/CardsList";
import { AddMenuButton } from "../fab/AddMenuButton";

export default function Menus() {

  return (
    <>
      <Grid container columns={10} columnSpacing={10} rowSpacing={5}>
        <CardsList/>
        <AddMenuButton/>
      </Grid>
    </>
  )
}