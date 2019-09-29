import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'

export default class About extends Component {
    render() {
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



                    .about-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 48px;
                        width: 100%;
                    }

                    .about {
                        display: flex;
                        flex-direction: column;
                        max-width: 600px;
                    }    

                    .about-art {
                        height: 400px;
                    }

                    @media screen and (max-width: 650px) {
                        .about-art {
                            height: 325px;
                        }

                        .about {
                            min-width: 100px;
                            margin: 24px;
                        }

                        h1 {
                            font-size: 42px;
                            font-family: 'Raleway', sans-serif;
                        }

                        p {
                            font-size: 18px;
                            font-family: 'Montserrat', sans-serif;
                        }

                    }
                `}</style>
                <Header shadow={true} />
                <div className="about-container">
                    <div className="about">
                        <img src={'/static/about.svg'} className="about-art" />
                        <h1>About</h1>
                        <p>Welcome!</p> 
                        <p>Using TheFlow you can save articles, online books and etc. If you have many devices, many accounts and you can't use built-in sync, you can save here sites what you need to read later.</p>
                        <p>TheFlow is a little web app I created for <a href='https://www.reactriot.com/'>ReactRiot 2019</a>.</p>
                        <p>I Think in future I'll release update for this and make it open source.</p>
                        <p>Now please check my other project on my GitHub!</p>
                        <p>Link in footer.</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
