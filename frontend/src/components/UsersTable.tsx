"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { DialogContext } from "@/context/DialogContext";
import { Button, ButtonGroup } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function UsersTable() {
  const userContext = useContext(UserContext);
  const dialogContext = useContext(DialogContext);

  if (!userContext || !dialogContext) {
    throw new Error("Context Error");
  }

  const { usersData, getUserById, getAllUsers, deleteUser, handleSetUserId } =
    userContext;
  const { handleClickOpenUpdate } = dialogContext;

  useEffect(() => {
    getAllUsers();
  }, []);

  const removeUser = async (id: number) => {
    await deleteUser(id);
    await getAllUsers();
  };

  const updateUser = async (id: number) => {
    await getUserById(id);
    handleSetUserId(id);
    handleClickOpenUpdate();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.gender}</TableCell>
              <TableCell>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button onClick={() => updateUser(row.id)}>Update</Button>
                </ButtonGroup>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  style={{ margin: "10px" }}
                >
                  <Button onClick={() => removeUser(row.id)}>Delete</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
