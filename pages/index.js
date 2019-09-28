import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'

export default class Index extends Component {
    render() {
        return (
            <div>
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,400i|Raleway:400,700&display=swap');

                    h1 {
                        font-size: 46px !important;
                        font-family: 'Raleway', sans-serif;
                    }

                    p {
                        font-size: 18px !important;
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
                    }

                    .highlight {
                        color: #3C72FF;
                    }

                    .landing-action {
                        display: flex;
                        margin: 36px 0;
                        
                    }
                `}</style>
                <Header shadow={true} />
                <div className="landing">
                    <div className="landing-text-container">
                        <h1>Keep all your <br /><span className="highlight">articles</span>, <span className="highlight">books</span> and <span className="highlight">courses</span> <br />in <span className="highlight">The</span>Flow</h1>
                        <p>
                            In TheFlow you can easily save and later access links to important web-sites on any device. 
                        </p>
                        <div className="landing-action">
                            <Button width={'12px'} bgColor={'#3C72FF'}>Sign-in</Button>
                        </div>
                    </div>
                    <img className='landing-art' src={'/static/landing.svg'} />
                </div>
            </div>
        )
    }
}
