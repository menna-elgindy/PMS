import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("ThemeContext is undefined");
  }

  return context;
};

export default useThemeContext;
