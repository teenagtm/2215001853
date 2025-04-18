import { useQuery } from 'react-query';
import { getUsers } from '../api/apiService';
import { User } from '../types';

export const useUsers = () => {
  return useQuery('users', async () => {
    const data = await getUsers();
    const usersList: User[] = Object.entries(data.users).map(([id, name]) => ({
      id,
      name,
    }));
    return usersList;
  });
};