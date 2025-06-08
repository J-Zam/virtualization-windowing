import React, { FC, ReactNode, useRef } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface Props {
  handleCloseModal(): void;
  modalBody: ReactNode;
  modalButtons: ReactNode;
  modalTitle: string;
  modalSize: "xs" | "sm" | "md" | "lg" | "xl";
  open: boolean;
  fullScreen: boolean;
  hideHeader?: boolean;
}

const Modal: FC<Props> = (props) => {
  const modalBodyRef = useRef(null);

  return (
    <div>
      <BootstrapDialog
        fullScreen={props.fullScreen}
        maxWidth={props.modalSize}
        onClose={props.handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        disableScrollLock
      >
        {props.hideHeader ? null : (
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={props.handleCloseModal}
          >
            <p className="tw-text-gray-400">{props.modalTitle}</p>
          </BootstrapDialogTitle>
        )}

        <DialogContent dividers ref={modalBodyRef}>
          <div className="relative">
            {props.modalBody}
          </div>
        </DialogContent>
        <DialogActions>{props.modalButtons}</DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Modal;
