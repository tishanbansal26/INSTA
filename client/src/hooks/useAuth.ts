import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';
import { LoginInput } from '@insureflow/shared';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: LoginInput) => authApi.login(credentials)
  });
};
