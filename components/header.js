import React, { Component } from 'react'
import firebase from 'firebase'

import Gravatar from 'react-gravatar'
import { height } from 'window-size'

export default class Header extends Component {

    state = {
        loggedin: false,
        email: null,
        overlay: false
    }

    componentDidMount() {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        loggedin: true,
                        email: user.email
                    })
                } else {
                    console.log("No user detected!")
                }
        })
    }
    

    render() {
        return (
            <div>
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i|Raleway:400,700&display=swap');


                    body {
                        margin: 0;
                    }

                    .header {
                        height: 54px;
                        display: flex;
                        padding: 12px 24px;
                        align-items: center;
                        justify-content: space-between;
                        box-shadow: ${this.props.shadow ? '0px 2px 4px rgba(0, 0, 0, 0.1);' : ''}
                    }

                    .header-left {
                        display: flex;
                        align-items: center;
                    }

                    .header-right {
                        display: flex;
                        align-items: center;
                    }

                    .header-right-mobile {
                        display: none;
                    }

                    .link {
                        margin-left: 24px;
                    }

                    .link {
                        text-decoration: none;
                        color: #000;
                        font-family: 'Montserrat', sans-serif;
                        font-size: 18px;
                        cursor: pointer;
                    }

                    .link:hover {
                        color: #666;
                        transition: all 0.2s ease 0s;
                    }

                    .avatar {
                        border-radius: 50%;
                        height: 32px;
                        width: 32px;
                        margin-right: 12px;
                    }

                    .email {
                        font-family: 'Montserrat', sans-serif;
                    }

                    .mobile-overlay {
                        display: none;
                        transition: all 0.2s;
                    }

                    .mobile-overlay-layout {
                        display: flex;
                        flex-direction: column;
                    }

                    @media screen and (max-width: 786px) {
                        .mobile-overlay {
                            height: 100%;
                            width: 100%;
                            position: fixed;
                            z-index: 1;
                            background-color: #fff;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .link {
                            margin: 0;
                        }

                        .links {
                            display: none;
                        }

                        .header-right {
                            display: none;
                        }

                        .header-right-mobile {
                            display: flex;
                            align-items: center;
                        }
                    }
                `}</style>
                    {this.state.overlay ? 
                    <div align='center' className="mobile-overlay">
                        <div className='mobile-overlay-layout'>
                            <a href='/' className='link'>Home</a>
                            <p>- - -</p>
                            <a href='/dashboard' className='link'>Dashboard</a>
                            <p>- - -</p>
                            <a href='/' className='link'>About</a>
                            
                            {this.state.loggedin ? 
                            <div>
                                <p>- - -</p>
                                
                                <div className="header-right-mobile">
                                    <Gravatar className="avatar" email={this.state.email} />
                                    <a className="email">{this.state.email}</a>
                                </div>
                                <br />
                                <a onClick={() => {
                                    firebase.auth().signOut().then(() => {
                                        window.location = '/'
                                    })
                                }} className='link' id="logout">Log-out</a>
                            </div> 
                            : ''}
                            <p>- - -</p>
                            <a onClick={() => {
                                this.setState({
                                    overlay: false
                                })
                            }} className='link'>Close</a>
                        </div>
                    </div>    
                : ''}
                <div className='header'>
                    <div className="header-left">
                        <a href='/'>
                            <img src="/static/logo.svg" />
                        </a>
                        <div className="links">
                            <a href='/' className='link'>Home</a>
                            <a href='/dashboard' className='link'>Dashboard</a>
                            <a href='/' className='link'>About</a>
                        </div>
                    </div>
                    <div>
                        {this.state.loggedin ? <div className="header-right">
                            <Gravatar className="avatar" email={this.state.email} />
                            <a className="email">{this.state.email}</a>
                            <a onClick={() => {
                            firebase.auth().signOut().then(() => {
                                window.location = '/'
                            })
                        }} className='link'>Log-out</a>
                        </div> : ''}
                        <div className="header-right-mobile">
                            <a onClick={() => {
                                this.setState({
                                    overlay: true
                                })
                            }}>
                                <img style={{height: 32}} src="/static/menu.svg" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
