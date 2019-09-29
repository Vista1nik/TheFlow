import React, { Component } from 'react'

import Header from '../../components/header'
import Button from '../../components/button'
import Footer from '../../components/footer'
import firebase from 'firebase'

export default class Login extends Component {

    
    componentDidMount() {
            if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
                let db = firebase.firestore()
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                  email = window.prompt('Please provide your email for confirmation');
                }
                firebase.auth().signInWithEmailLink(email, window.location.href)
                  .then(function(result) {
                    if (result.additionalUserInfo.isNewUser) {
                        db.collection('flows').doc(result.user.uid).collection('userflows').doc('default')
                        .set({
                            flowname: 'Default Flow',
                            flowdesc: 'Your first flow.',
                            flow: [],
                            share: false,
                            galleryId: ''
                        })
                        .then(res => {
                            window.localStorage.removeItem('emailForSignIn');
                            window.location = '/dashboard'
                        })
                    } else {
                        window.localStorage.removeItem('emailForSignIn');
                        window.location = '/dashboard'
                    }
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
                <div style={{marginTop: 24}} align="center">
                        <img src={'/static/loading.gif'} />
                </div>
                <Footer />
            </div>
        )
    }
}
