import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'

export default function Error({ statusCode }) {
    return (
      <div>
          <style jsx>{`
                    h1 {
                        font-size: 46px;
                        font-family: 'Raleway', sans-serif;
                    }

                    p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                    }
              `}</style>
          <Header shadow={true} />
          <div className="error" align="center">
                {statusCode ? <h1>{statusCode}</h1> : <h1>Client error.</h1>}
                <p>Oops. Well please, behave like you don't saw this.</p>
          </div>
          <Footer />
      </div>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }
