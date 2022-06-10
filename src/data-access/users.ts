import { UserType } from '../types/user';
import User from '../models/user';

export const getAllUsersFromDataBase = async () => {
  const users = await User.findAll();
  return JSON.parse(JSON.stringify(users));
};

export const getUserByIdFromDataBase = async (id: string) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });
  return user;
};

export const getUserByLoginFromDataBase = async (login: string) => {
  const user = await User.findOne({
    where: {
      login,
    },
  });
  return user;
};

export const createUserInDataBase = async (newUserObject: UserType) => {
  const newUser = await User.create(newUserObject);
  return newUser;
};

export const updateUserInDataBase = async (id: string, updatedUserDataObject: UserType) => {
  const user = await User.update(updatedUserDataObject, {
    where: {
      id,
    },
    returning: true,
  });
  return user;
};

export const deleteUserInDataBase = async (id: string) => {
  const userDeletedStatus = await User.destroy({
    where: {
      id,
    },
  });
  return userDeletedStatus;
};
