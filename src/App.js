import React from 'react';
import { ThemeProvider } from 'theme-ui'


const App = () => {
  return (
    <ThemeProvider>
    <h1
      sx={{
        color: 'primary',
        fontFamily: 'heading',
      }}>
        Unite Scrapbook
    </h1>
  </ThemeProvider>
  );
}

export default App;
