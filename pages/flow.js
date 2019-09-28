import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'


export default class Flow extends Component {
    render() {
        return (
            <div>
                <style jsx>{`
                    .flow-container {
                        display: flex;
                        justify-content: center;
                        margin-top: 48px;
                        width: 100%;
                    }    
                `}</style>
                <Header shadow={true} />
                <div className="flow-container">
                    
                </div>
                <Footer />
            </div>
        )
    }
}

class FlowObject extends Component {
    render() {
        return (
            <div>
                <style jsx>{`

                `}</style>
            </div>
        )
    }
}


