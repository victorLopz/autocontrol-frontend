import { useRouter } from 'next/navigation';
import { ROUTES } from '@//shared/constants/routes.constants';
import { useAppDispatch } from '@//store/hooks';
import type { LoginType } from '@//types/form-action';
import { sendLogin } from '@/store/actions/send-login';

const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const execute = async (data: LoginType) => {
    try {
      await dispatch(sendLogin(data)).unwrap();
      router.push(ROUTES.DASHBOARD);
    } catch {}
  };

  return { execute };
};

export default useLogin;
