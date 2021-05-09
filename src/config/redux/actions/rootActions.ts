import * as types from './types';
export function enableLoader(enable: boolean) {
  return {
    type: types.ENABLE_LOADER,
    enable,
  };
}

export function enableModal(message: string, isError: boolean = false) {
  return {
    type: types.ENABLE_MODAL,
    message,
    isError,
  };
}

export function disableModal() {
  return {
    type: types.DISABLE_MODAL,
  };
}
