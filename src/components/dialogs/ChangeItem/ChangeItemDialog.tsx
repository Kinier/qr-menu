import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { FC } from "react";
import ChangeItemForm from "./ChangeItemForm";


interface Props {
    open: boolean;
    onClose: () => void;
    itemId: number
}

const ChangeItemDialog: FC<Props> = ({ open, onClose, itemId }) => {
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Change item</DialogTitle>
            <DialogContent>
                <ChangeItemForm onClose={onClose} itemId={itemId}/>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeItemDialog;