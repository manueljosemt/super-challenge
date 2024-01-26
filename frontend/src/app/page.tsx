"use client";
import { UserProvider } from "@/context/UserContext";
import { DialogProvider } from "@/context/DialogContext";
import UsersTable from "@/components/UsersTable";
import NewUserButton from "@/components/NewUserButton";
import UsersDialog from "@/components/UsersDialog";

export default function Home() {
  return (
    <UserProvider>
      <DialogProvider>
        <NewUserButton />
        <UsersTable />
        <UsersDialog />
      </DialogProvider>
    </UserProvider>
  );
}
