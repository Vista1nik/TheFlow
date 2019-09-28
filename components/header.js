import React, { Component } from 'react'
import firebase from 'firebase'

import Gravatar from 'react-gravatar'

export default class Header extends Component {

    state = {
        loggedin: false,
        email: null
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
                `}</style>
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
                    </div>
                </div>
            </div>
        )
    }
}
