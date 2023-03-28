import React from "react";
import AddCategoryForm from "./AddCategoryForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";


interface Props {
    open: boolean;
    onClose: () => void;
}

const AddCategoryDialog: React.FC<Props> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Add a new category</DialogTitle>
            <DialogContent>
                <AddCategoryForm onClose={onClose}/>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryDialog;