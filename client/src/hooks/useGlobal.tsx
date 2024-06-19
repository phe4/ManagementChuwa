import { useAppDispatch } from '../app/hooks.ts';
import { updateLoading, updateMessage } from '../app/reducers/global.ts';

export const useGlobal = () => {
  const dispatch = useAppDispatch();

  const showLoading = (isShow: boolean) => {
    dispatch(updateLoading(isShow));
  };

  const showMessage = (msg: string, delay = 2000) => {
    dispatch(updateMessage({show: true, msg: msg}));
    setTimeout(() => {
      dispatch(updateMessage({show: false, msg: ''}));
    }, delay);
  };

  return { showLoading, showMessage };
};
