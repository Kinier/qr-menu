import { Grid } from "@mui/material";
import MenusList from "../components/lists/MenusList";

export default function Menus() {

    return (
        <>
            <Grid container columns={10} columnSpacing={10} rowSpacing={5} justifyContent={'center'}>
                <MenusList />
            </Grid>
        </>
    )
}