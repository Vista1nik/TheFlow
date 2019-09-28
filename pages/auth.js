import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'

import firebase from 'firebase'

export default class Auth extends Component {

    render() {
        return (
            <div>
                <style jsx global>{`
                    h1 {
                        font-size: 46px;
                        font-family: 'Raleway', sans-serif;
                    }

                    p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                    }

                    input {
                        padding: 12px;
                        border: 1px solid #666;
                        border-radius: 8px;
                        width: 300px;Sign-in
                    }

                    .auth {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 48px;
                        width: 100%;
                    }

                    .auth-container {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                    }

                    .auth-form{
                        display: flex;
                        justify-content: center;
                    }

                    .auth-art {
                        height: 300px;
                    }

                    .auth-signin {
                        margin-top: 24px;
                    }
                    
                    span {
                        color: #3C72FF;
                    }
                `}</style>
                <Header shadow={true} />
                <div className="auth">
                    <div className="auth-container">
                        <img className="auth-art" src={'/static/auth.svg'} />
                        <div align='center'>
                            <h1>Give us your email!</h1>
                            <p>After pressing "Sign-in" button you will get <span>*MAGIC*</span> link to sign-in!</p>
                        </div>
                        <div className="auth-form">
                            <AuthForm />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

class AuthForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sended: false
        }

        this.email = React.createRef()
    }

    authUser = () => {
        firebase.auth().sendSignInLinkToEmail(this.email.current.value, {
            url: 'http://localhost:3000/service/login',
            handleCodeInApp: true,
        })
        .then(() => {
            window.localStorage.setItem('emailForSignIn', this.email.current.value);
            alert('Check your email for link!')
        })
        .catch(error => {
            alert(error)
        });
    }
    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                window.location = '/dashboard'
            }
        })
    }
    

    render() {
        return (
            <div>
                {!this.state.sended ? 
                    <div>
                        <p>Email</p>
                        <input type="email" id="email" ref={this.email} type="email" placeholder="Type here your email"/>
                        <Button onClick={this.authUser} className="auth-signin" height={'12px'} bgColor={'#3C72FF'}>Sign-in</Button>
                    </div>
                    :
                    <div>
                        <p>Check your email for link!</p>
                    </div>
                }
            </div>
        )
    }
}
