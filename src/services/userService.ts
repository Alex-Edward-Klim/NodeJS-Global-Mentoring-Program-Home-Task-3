import Joi from 'joi';
import { UserType } from '../types/user';
import {
  createUserInDataBase,
  deleteUserInDataBase,
  getAllUsersFromDataBase,
  getUserByIdFromDataBase,
  getUserByLoginFromDataBase,
  updateUserInDataBase,
} from '../data-access/users';

const getUserById = async (id: string) => {
  const user = await getUserByIdFromDataBase(id);
  return user;
};

const deleteUser = async (id: string) => {
  const userDeletedStatus = await deleteUserInDataBase(id);
  return userDeletedStatus;
};

const validateUserByAllFields = (user: UserType) => {
  const schema = Joi.object({
    login: Joi.string().alphanum().required(),

    password: Joi.string()
      .pattern(/[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)/)
      .required(),

    age: Joi.number().integer().min(4).max(130)
      .required(),
  });

  const { error } = schema.validate(user, { abortEarly: false, allowUnknown: false });

  return error;
};

const validateUserByOneField = (user: UserType) => {
  const schema = Joi.object({
    login: Joi.string().alphanum(),

    password: Joi.string()
      .pattern(/[A-Za-z0-9]*([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)/),

    age: Joi.number().integer().min(4).max(130),
  }).min(1);

  const { error } = schema.validate(user, { abortEarly: false, allowUnknown: false });

  return error;
};

const checkIfLoginAlreadyTaken = async (login: string) => {
  if (login === undefined) {
    return false;
  }

  const user = await getUserByLoginFromDataBase(login);
  if (user) {
    return true;
  }

  return false;
};

const checkIfUserAlreadyExists = async (login: string) => {
  const user = await getUserByLoginFromDataBase(login);
  if (user) {
    return true;
  }
  return false;
};

const createNewUser = async (user: UserType) => {
  const newUserData = await createUserInDataBase(user);
  return newUserData;
};

const updateUser = async (id: string, updatedUserDataObject: UserType) => {
  const updatedUserData = await updateUserInDataBase(id, updatedUserDataObject);

  if (updatedUserData[0] === 1) {
    return updatedUserData[1][0];
  }
  return updatedUserData;
};

const sortUsersAscending = (a: UserType, b: UserType) => {
  if (a.login < b.login) {
    return -1;
  }
  if (b.login > a.login) {
    return 1;
  }
  return 0;
};

const getAutoSuggestUsers = async (loginSubstring: any = undefined, limit: any = undefined) => {
  if (limit !== undefined && (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
    return null;
  }

  const users = await getAllUsersFromDataBase();
  if (!users) {
    return null;
  }

  if (limit !== undefined && loginSubstring === undefined) {
    const limitNum = Number(limit);

    const sortedArr = [...users].sort(sortUsersAscending);

    return sortedArr.slice(0, limitNum);
  } if (loginSubstring !== undefined && limit === undefined) {
    const filteredArr = users.filter(
      (user: UserType) => user.login.includes(loginSubstring),
    );

    const sortedAndFilteredArr = filteredArr.sort(sortUsersAscending);

    return sortedAndFilteredArr;
  } if (loginSubstring !== undefined && limit !== undefined) {
    const limitNum = Number(limit);

    const filteredArr = users.filter(
      (user: UserType) => user.login.includes(loginSubstring),
    );

    const sortedAndFilteredArr = filteredArr.sort(sortUsersAscending);

    return sortedAndFilteredArr.slice(0, limitNum);
  }

  return users;
};

const userService = {
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  checkIfLoginAlreadyTaken,
  checkIfUserAlreadyExists,
  getAutoSuggestUsers,
  validateUserByAllFields,
  validateUserByOneField,
};

export default userService;
