import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'

export default class Index extends Component {
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

                    

                    .landing {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                    }

                    .landing-text-container {
                        width: 600px;
                    }

                    .landing-art {
                        height: 700px;
                        margin-bottom: 7%;
                    }

                    .highlight {
                        color: #3C72FF;
                    }

                    .landing-action {
                        display: flex;
                        margin: 36px 0;
                        
                    }

                    .container {
                        margin: 0 48px;
                    }

                    @media screen and (max-width: 786px) {
                        .landing {
                            flex-direction: column-reverse;
                        }
                    }

                    @media screen and (max-width: 628px) {
                        .landing-art {
                            height: 325px;
                        }

                        h1 {
                            font-size: 42px;
                            font-family: 'Raleway', sans-serif;
                        }

                        p {
                            font-size: 18px;
                            font-family: 'Montserrat', sans-serif;
                        }

                        .landing-text-container {
                            width: fit-content;
                        }                                                 
                    }
                `}</style>
                <Header shadow={true} />
                    <div className="container">
                        <div className="landing">
                            <div className="landing-text-container">
                                <h1>Keep links to all your <br /><span className="highlight">articles</span>, <span className="highlight">books</span> and <span className="highlight">courses</span> <br />in <span className="highlight">The</span>Flow</h1>
                                <p>
                                    In TheFlow you can easily save and later access links to important web-sites on any device. 
                                </p>
                                <div className="landing-action">
                                    <Button href="/auth" height={'12px'} bgColor={'#3C72FF'}>Get started</Button>
                                    <div style={{
                                        margin: 8
                                    }} />
                                    <Button href="/gallery" width={'12px'} height={'12px'} bgColor={'#000'}>See Gallery</Button>
                                </div>
                            </div>
                            <img className='landing-art' src={'/static/landing.svg'} />
                        </div>
                    </div>
                <Footer />
            </div>
        )
    }
}
