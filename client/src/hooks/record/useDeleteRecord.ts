import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '../../types/util.types';
import api from '../../utils/axiosInstance';
import { Record } from '../../types/record.types';

type DeleteRecordParams = {
  id: string;
};

const mutationFn = async (params: DeleteRecordParams) => {
  const res = await api.delete(`/record/${params.id}`);
  return res.data;
};

export const useDeleteRecord = () => {
  const queryClient = useQueryClient();

  return useMutation<Record, ApiError, DeleteRecordParams>(
    (params) => mutationFn(params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['records']);
      },
    },
  );
};