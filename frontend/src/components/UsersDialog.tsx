"use client";
import { useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { DialogContext } from "@/context/DialogContext";
import { UserContext } from "@/context/UserContext";

const genders = [
  {
    value: "MALE",
    label: "MALE",
  },
  {
    value: "FEMALE",
    label: "FEMALE",
  },
];

export default function UsersDialog() {
  const dialogContext = useContext(DialogContext);
  const userContext = useContext(UserContext);

  if (!dialogContext || !userContext) {
    throw new Error("Context Error");
  }

  const { open, handleClose, saveType } = dialogContext;
  const {
    userId,
    formData,
    handleChange,
    createUser,
    updateUser,
    getAllUsers,
  } = userContext;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here, such as sending data to the server
    if (saveType === "SAVE") {
      await createUser(formData);
      await getAllUsers();
      handleClose();
    } else if (saveType === "UPDATE") {
      const data = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        gender: formData.gender,
      };
      await updateUser(userId, data);
      await getAllUsers();
      handleClose();
    } else {
      console.log("Form Error!");
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Users form</DialogTitle>
      <div style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  required
                  id="first_name"
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="gender"
                  select
                  label="Select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  helperText="Select gender"
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            SAVE
          </Button>
        </form>
      </div>
    </Dialog>
  );
}
