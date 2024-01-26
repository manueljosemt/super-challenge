"use client";
import { useContext } from "react";
import { DialogContext } from "@/context/DialogContext";
import { Button } from "@mui/material";

export default function NewUserButton() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("Context Error");
  }

  const { handleClickOpenNew } = context;

  return (
    <Button variant="outlined" onClick={() => handleClickOpenNew()}>
      New User
    </Button>
  );
}
