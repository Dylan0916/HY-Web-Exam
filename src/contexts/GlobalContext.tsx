import {
  FC,
  ReactNode,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

const GlobalContext = createContext<ContextValue>({
  isProgressBarMoving: false,
  setIsProgressBarMoving: () => {},
});

type ContextValue = {
  isProgressBarMoving: boolean;
  setIsProgressBarMoving: Dispatch<SetStateAction<boolean>>;
};

interface ContextProps {
  children: ReactNode;
  value: ContextValue;
}

export const GlobalContextProvider: FC<ContextProps> = ({
  children,
  value,
}) => {
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
