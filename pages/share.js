import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'


import firebase, { firestore } from 'firebase'

const getURL = (url) => {
    let regex = /^((http|https|ftp):\/\/)/;
    if (typeof(url) === 'string') {
        if (!regex.test(url)) {
            return 'http://' + url
        } else {
            return url
        }
    } else {
        return '#'
    }
}


export default class Flow extends Component {

    static getInitialProps({query}) {
        return {query}
    }

    state = {
        flow: [],
        info: null
    }

    componentDidMount() {
        let db = firebase.firestore()
        // Reset state on update
        this.setState({
            flow: [],
            info: null
        })

        db.collection('flows').doc(this.props.query.userid).collection('userflows').doc(this.props.query.flowid)
        .onSnapshot(data => {
            let flow = data.data().flow
            let flowWithIndex = [];
            flow.map((flowobj, index) => {
                flowWithIndex.push(Object.assign(flowobj, {index: index}))
            })

            if (flowWithIndex.length == flow.length) {
                this.setState({
                    flow: flowWithIndex,
                    info: data.data()
                })
            }

        })
    }

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

                    .tip {
                        color: #888;
                    }


                    .flow-container {
                        display: flex;
                        justify-content: center;
                        margin-top: 24px;
                        width: 100%;
                    }    
                `}</style>
                <Header shadow={true} />
                <div className="flow-container">
                    {this.state.info ? 
                    <div>
                        <div align="center">
                            <h1>{this.state.info.flowname}</h1>
                            <p>{this.state.info.flowdesc}</p>
                        </div>
                        {this.state.flow.map(obj => {
                            return <FlowObject deleteFlows={this.deleteFlowObj} updateFlows={this.updateFlowObj} favicon={obj.favicon} index={obj.index} url={obj.url} title={obj.title} desc={obj.desc} />
                        })}
                    </div> 
                    :
                    <div>
                        <img src={'/static/loading.gif'} />
                    </div>
                    }
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
                    .circle-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .circle {
                        border-radius: 50%;
                        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
                        width: 142px;
                        height: 142px;
                        display: flex;
                        margin: 24px 0;
                        margin-left: 324px;
                        justify-content: center;
                        align-items: center;

                    }

                    input {
                        border: solid 0px;
                        display: block;
                        width: 300px;
                        margin: 10px 0;
                        padding: 0;
                    }

                    textarea {
                        border: solid 0px;
                        display: block;
                        width: 200px;
                        margin: 10px 0;
                        padding: 0;
                    }

                    .flow-container {
                        display: flex;
                        flex-direction: column
                    }

                    .url {
                        color: #666;
                    }

                    .edit {
                        margin-left: 24px;
                    }

                    .action {
                        display: flex;
                    }

                    /* For Input */
                    h1 {
                        font-size: 24px;
                        font-family: 'Raleway', sans-serif;
                        width: 300px;
                        margin: 10px 0;
                        font-weight: 700;
                    }

                    p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                        width: 300px;
                        margin: 10px 0;
                    }

                    .favicon {
                        height: 48px;
                        width: 48px;
                    }

                    .action {
                        margin-top: 12px;
                    }

                    .loading {
                        height: 64px;
                        width: 64px;
                    }

                    @media screen and (max-width: 1092px) {
                        .circle-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            flex-direction: column;
                        }

                        .circle {
                            margin: 24px 0;
                        }
                        
                        .edit {
                            margin-bottom: 24px;
                        }
                    }
                `}</style>
                <div className="flow-container">
                    <img src='/static/dots.svg' />
                    <div className="circle-container">
                        <a href={getURL(this.props.url)}>
                            <div className="circle">
                                 <img className="favicon" src={this.props.favicon} />
                            </div>
                        </a>
                        <div className="edit">
                            <h1>{this.props.title}</h1>
                            <p className='url'>{this.props.url}</p>
                            <p>{this.props.desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}