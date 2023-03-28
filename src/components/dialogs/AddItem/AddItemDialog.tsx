import React from "react";
import AddCategoryForm from "./AddItemForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";


interface Props {
    open: boolean;
    onClose: () => void;
}

const AddItemDialog: React.FC<Props> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Add a new item</DialogTitle>
            <DialogContent>
                <AddCategoryForm onClose={onClose}/>
            </DialogContent>
        </Dialog>
    );
};

export default AddItemDialog;