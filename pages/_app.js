import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import firebase from 'firebase'

class MyApp extends App {
  
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
  
    return { ...appProps }
  }

  state = {
    init: false
  }

  componentWillMount() {
    let firebaseConfig = {
      apiKey: "AIzaSyAdAQPepW78foGBLDLOCwWF6XiQxvMH86M",
      authDomain: "theflow-app.firebaseapp.com",
      databaseURL: "https://theflow-app.firebaseio.com",
      projectId: "theflow-app",
      storageBucket: "",
      messagingSenderId: "1087556939162",
      appId: "1:1087556939162:web:7baee124e790eee6fede23"
    };

    // Initialize Firebase

      try {
        firebase.initializeApp(firebaseConfig);
      } catch(e) {
        console.log("Firebase already inited.")
      }
  }
  

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>TheFlow</title>
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}
  
export default MyApp
