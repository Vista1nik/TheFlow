import React from 'react'
import App from 'next/app'
import { ThemeProvider } from "@chakra-ui/core";

import FlowTheme from '../theme'

class MyApp extends App {
    

    render() {
      const { Component, pageProps } = this.props
      return (
          <div>
            <ThemeProvider theme={FlowTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
          </div>
      )
    }
  }
  
  export default MyApp