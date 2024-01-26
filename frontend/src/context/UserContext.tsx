import { createContext, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
};

interface ThemeContextType {
  isLoading: boolean;
  usersData: Array<User>;
  getAllUsers: () => void;
  getUserById: (id: number) => void;
  createUser: (contact: UserData) => void;
  updateUser: (id: number, contact: UserData) => void;
  deleteUser: (id: number) => void;
  formData: UserData;
  handleChange: (e) => void;
  handleSetUserId: (id: number) => void;
  userId: number;
}

const clearFormData = {
  first_name: "",
  last_name: "",
  email: "",
  gender: "",
};

export const UserContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }) => {
  const [usersData, setUsersData] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [formData, setFormData] = useState(clearFormData);

  const BASE_URL = "http://localhost:3005";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSetUserId = (id: number) => {
    setUserId(id);
  };

  // API requests
  const getAllUsers = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${BASE_URL}/api/v1/users`);

      setUsersData(data);
      setFormData(clearFormData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const getUserById = async (id: number) => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${BASE_URL}/api/v1/users/${id}`);

      setFormData(data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const createUser = async (user: UserData) => {
    try {
      setIsLoading(true);

      await axios.post(`${BASE_URL}/api/v1/users`, user);

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const updateUser = async (id: number, user: UserData) => {
    try {
      setIsLoading(true);

      await axios.put(`${BASE_URL}/api/v1/users/${id}`, user);

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      setIsLoading(true);

      await axios.delete(`${BASE_URL}/api/v1/users/${id}`);

      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        usersData,
        getAllUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        formData,
        handleChange,
        handleSetUserId,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
