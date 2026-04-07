import type { PropsWithChildren } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import maintineStyles from '@mantine/core/styles.css?url';
import ownStyles from '../main.css?url';

export const ThemeProvider: React.FC<
  PropsWithChildren<{ themeColour: string; domRoot: HTMLElement }>
> = ({ themeColour, domRoot, children }) => {
  const theme = createTheme({
    components: { Portal: { defaultProps: { target: domRoot } } },
  });
  return (
    <MantineProvider
      cssVariablesSelector={domRoot.tagName}
      getRootElement={() => domRoot}
      theme={theme}
      defaultColorScheme={
        (themeColour as 'light' | 'dark' | undefined) ||
        // iD sends undefined if using the browser's default:
        (window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light')
      }
    >
      <link rel="stylesheet" href={maintineStyles} />
      <link rel="stylesheet" href={ownStyles} />
      {children}
    </MantineProvider>
  );
};
