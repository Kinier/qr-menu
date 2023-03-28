    import React from "react";
import AddMenuForm from "./AddMenuForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";


interface Props {
    open: boolean;
    onClose: () => void;
}

const AddMenuDialog: React.FC<Props> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Add a new menu</DialogTitle>
            <DialogContent>
                <AddMenuForm onClose={onClose}/>
            </DialogContent>
        </Dialog>
    );
};

export default AddMenuDialog;