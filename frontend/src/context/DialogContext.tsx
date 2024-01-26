import { createContext, useState } from "react";

interface ThemeContextType {
  open: boolean;
  saveType: string;
  handleClickOpenNew: () => void;
  handleClickOpenUpdate: () => void;
  handleClose: () => void;
}

export const DialogContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const DialogProvider = ({ children }) => {
  const [saveType, setSaveType] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpenNew = () => {
    setOpen(true);
    setSaveType("SAVE");
  };

  const handleClickOpenUpdate = () => {
    setOpen(true);
    setSaveType("UPDATE");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        open,
        saveType,
        handleClickOpenNew,
        handleClickOpenUpdate,
        handleClose,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
