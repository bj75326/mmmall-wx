import { create } from 'zustand';
import withMiddleware from './middleware';

export interface ConfigStates {
  theme: {
    primary: string;
    info: string;
    default: string;
  };
}

export interface ConfigActions {}

const useConfigStore = create(
  withMiddleware<ConfigStates & ConfigActions>(
    (set) => ({
      theme: {
        primary: 'rgb(255, 68, 68)',
        info: 'rgb(255, 136, 85)',
        default: 'rgb(255, 255, 255)',
      },
    }),
    'config',
  ),
);

export default useConfigStore;
