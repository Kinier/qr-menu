import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { FC } from "react";
import ChangeCategoryForm from "./ChangeCategoryForm";


interface Props {
    open: boolean;
    onClose: () => void;
    categoryId: number
}

const ChangeCategoryDialog: FC<Props> = ({ open, onClose, categoryId }) => {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Change menu</DialogTitle>
            <DialogContent>
                <ChangeCategoryForm onClose={onClose} categoryId={categoryId}/>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeCategoryDialog;