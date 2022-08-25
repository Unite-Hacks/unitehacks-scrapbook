import React from 'react';
import { ThemeProvider } from 'theme-ui'

const Post = () => {
  return (
  
      <ThemeProvider>
    <h1
      sx={{
        color: 'primary',
        fontFamily: 'heading',
      }}>
        Post
    </h1>
  </ThemeProvider>
   
  );
}

export default Post;
