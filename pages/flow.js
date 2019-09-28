import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'

import TextareaAutosize from 'react-autosize-textarea';

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
        return 'loading...'
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

    updateFlowObj = (index, obj) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let db = firebase.firestore()
                // Global flows and user flows
                let newFlow = this.state.flow
                newFlow[index] = obj
                db.collection('flows').doc(user.uid).collection('userflows').doc(this.props.query.id)
                .update({
                    flow: newFlow
                })
                .then(res => {
                    window.location.reload(true)
                })
            }
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let db = firebase.firestore()
                // Global flows and user flows
                db.collection('flows').doc(user.uid).collection('userflows').doc(this.props.query.id).get()
                .then((data) => {
                    
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
            } else {
                window.location = '/auth'
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
                            return <FlowObject updateFlows={this.updateFlowObj} index={obj.index} url={obj.url} title={obj.title} desc={obj.desc} />
                        })}   
                    </div> 
                    :
                    <div>
                        Loading...
                    </div>
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

class FlowObject extends Component {

    state = {
        title: this.props.title,
        desc: this.props.desc,
        url: this.props.url
    }

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
                        margin-left: 224px;
                        justify-content: center;
                        align-items: center;

                    }

                    input {
                        border: solid 0px;
                        display: block;
                        width: 200px;
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

                    /* For Input */
                    .h1 {
                        font-size: 24px;
                        font-family: 'Raleway', sans-serif;
                        font-weight: 700;
                    }

                    .p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                    }

                    .favicon {
                        height: 48px;
                        width: 48px;
                    }
                `}</style>
                <div className="flow-container">
                    <img src='/static/dots.svg' />
                    <div className="circle-container">
                        <a href={getURL(this.state.url)}>
                            <div className="circle">
                                <img className="favicon" src={getURL(this.state.url) + '/favicon.ico'} />
                            </div>
                        </a>
                        <div className="edit">
                            <TextareaAutosize style={{fontSize: 24, fontFamily: 'Raleway, sans-serif', fontWeight: 700, border: 'none', resize: 'vertical', padding: 0, width: 200}} onChange={e => this.setState({title: e.target.value, edit: true})}placeholder={this.props.title} value={this.state.title} />
                            <input onChange={e => this.setState({url: e.target.value, edit: true})} className="p url" placeholder={this.props.url} value={this.state.url} />
                            <TextareaAutosize style={{fontSize: 18, fontFamily: 'Montserrat, sans-serif', border: 'none', resize: 'vertical', padding: 0, width: 200}} onChange={e => this.setState({desc: e.target.value, edit: true})} placeholder={this.props.desc} value={this.state.desc} />
                            {this.state.edit ? <Button marginRight={'12px'} onClick={() => {
                                this.props.updateFlows(this.props.index, {
                                    title: this.state.title,
                                    desc: this.state.desc,
                                    url: this.state.url
                                })
                            }} height={'8px'} bgColor={'#3C72FF'}>Save changes</Button> : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
