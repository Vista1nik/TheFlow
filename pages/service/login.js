import React, { Component } from 'react'

import Header from '../../components/header'
import Button from '../../components/button'
import Footer from '../../components/footer'
import firebase from 'firebase'

export default class Login extends Component {

    
    componentDidMount() {
            if (firebase.auth().isSignInWithEmailLink(window.location.href)) {

                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                  email = window.prompt('Please provide your email for confirmation');
                }
                firebase.auth().signInWithEmailLink(email, window.location.href)
                  .then(function(result) {
                    window.localStorage.removeItem('emailForSignIn');
                  })
                  .catch(function(error) {
                    alert(error)
                  });
            } else {
                window.location = '/'
            }
    }
    

    render() {
        return (
            <div>
                <Header shadow={true} />
                <div>
                    <p>Processing...</p>
                </div>
                <Footer />
            </div>
        )
    }
}
