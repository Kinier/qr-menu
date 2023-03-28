import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { FC } from "react";
import ChangeMenuForm from "./ChangeMenuForm";


interface Props {
    open: boolean;
    onClose: () => void;
}

const ChangeMenuDialog: FC<Props> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Change menu</DialogTitle>
            <DialogContent>
                <ChangeMenuForm onClose={onClose}/>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeMenuDialog;