import { getApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const getUserProfile = async () => {
  const response = await getApi();
  return response;
};

const getListUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: getUserProfile,
  });

  return {
    users,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default getListUsers;