import PropTypes from 'prop-types';
import { createContext, useMemo } from 'react';

// project imports
import config from 'config';
import { useLocalStorage } from 'hooks/useLocalStorage';

// ==============================|| CONFIG CONTEXT ||============================== //

export const ConfigContext = createContext(undefined);

// ==============================|| CONFIG PROVIDER ||============================== //

export function ConfigProvider({ children }) {
  const { state, setState, setField, resetState } = useLocalStorage('vsingles-config-vite-js', config);

  // Force site-wide font to Comic Neue from Google Fonts (works on Android/iOS)
  const stateWithFont = useMemo(() => ({ ...state, fontFamily: config.fontFamily }), [state]);

  const memoizedValue = useMemo(() => ({ state: stateWithFont, setState, setField, resetState }), [stateWithFont, setField, setState, resetState]);

  return <ConfigContext.Provider value={memoizedValue}>{children}</ConfigContext.Provider>;
}

ConfigProvider.propTypes = { children: PropTypes.node };
