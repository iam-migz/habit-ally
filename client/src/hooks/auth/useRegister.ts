import { api } from '../../utils/api';
import { useMutation } from 'react-query';
import { ApiError, Token } from '../../types/util.types';
import { setStoredToken } from '../../utils/localStorage';
import { useTokenContext } from '../../contexts/TokenContext';

type RegisterParams = {
  name: string;
  email: string;
  password: string;
};

const mutationFn = async (user: RegisterParams) => {
  const res = await api.post('/user/register', {
    name: user.name,
    email: user.email,
    password: user.password,
  });
  return res.data;
};

export const useRegister = () => {
  const { setUserToken } = useTokenContext();
  return useMutation<Token, ApiError, RegisterParams>(
    (user) => mutationFn(user),
    {
      onSuccess: (res) => {
        setUserToken(res.token);
        setStoredToken(res.token);
      },
    },
  );
};
