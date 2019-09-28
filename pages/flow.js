import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'
import axios from 'axios'

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

    deleteFlowObj = (index) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let db = firebase.firestore()
                // Global flows and user flows
                let newFlow = this.state.flow
                newFlow.splice(index, 1)
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

    createFlowObj = (obj) => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let db = firebase.firestore()
                // Global flows and user flows
                let newFlow = this.state.flow
                newFlow.push(obj)
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
                            <p className='tip'>TIP: To delete Flow object click on title or description, the "Delete" button will appear.</p>

                        </div>
                        {this.state.flow.map(obj => {
                            return <FlowObject deleteFlows={this.deleteFlowObj} updateFlows={this.updateFlowObj} favicon={obj.favicon} index={obj.index} url={obj.url} title={obj.title} desc={obj.desc} />
                        })}
                        <CreateFlowObject createFlowObject={this.createFlowObj} />   
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
        url: this.props.url,
        favicon: this.props.favicon
    }

    getMeta = () => {
        axios.get('/api/metadata?url=' + getURL(this.state.url))
        .then(res => {
            this.setState({
                title: res.data.meta.title,
                desc: res.data.meta.description,
                favicon: res.data.meta.icon
            })
        })
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
                `}</style>
                <div className="flow-container">
                    <img src='/static/dots.svg' />
                    <div className="circle-container">
                        <a href={getURL(this.state.url)}>
                            <div className="circle">
                                <img className="favicon" src={this.state.favicon} />
                            </div>
                        </a>
                        <div className="edit">
                            <TextareaAutosize onClick={() => {this.setState({
                                edit: true
                            })}} style={{fontSize: 24, fontFamily: 'Raleway, sans-serif', fontWeight: 700, border: 'none', resize: 'vertical', padding: 0, width: 300}} onChange={e => this.setState({title: e.target.value, edit: true})}placeholder={this.props.title} value={this.state.title} />
                            <input onClick={() => {this.setState({
                                edit: true
                            })}} onBlur={this.getMeta} onChange={e => this.setState({url: e.target.value, edit: true})} className="p url" placeholder={this.props.url} value={this.state.url} />
                            <TextareaAutosize onClick={() => {this.setState({
                                edit: true
                            })}} style={{fontSize: 18, fontFamily: 'Montserrat, sans-serif', border: 'none', resize: 'vertical', padding: 0, width: 300}} onChange={e => this.setState({desc: e.target.value, edit: true})} placeholder={this.props.desc} value={this.state.desc} />
                            {this.state.edit ? <div className={"action"}>
                                <Button marginRight={'12px'} onClick={() => {
                                this.props.updateFlows(this.props.index, {
                                    title: this.state.title,
                                    desc: this.state.desc,
                                    url: this.state.url,
                                    favicon: this.state.favicon
                                })
                            }} height={'8px'} bgColor={'#3C72FF'}>Save changes</Button>
                            <Button onClick={() => {
                                if (confirm('Please confirm deletion of flow object.')) {
                                    this.props.deleteFlows(this.props.index)
                                }
                            }} height={'8px'} width={'28px'} bgColor={'#F11F4C'}>Delete</Button>
                            </div> : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class CreateFlowObject extends Component {

    state = {
        title: '',
        desc: '',
        url: null,
        favicon: '/static/plus.svg'
    }

    getMeta = () => {
        axios.get('/api/metadata?url=' + getURL(this.state.url))
        .then(res => {
            this.setState({
                title: res.data.meta.title,
                desc: res.data.meta.description,
                favicon: res.data.meta.icon
            })
        })
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
                        <a href={getURL(this.state.url)}>
                            <div className="circle">
                                <img className="favicon" src={this.state.favicon} />
                            </div>
                        </a>
                        <div className="edit">
                            <TextareaAutosize style={{fontSize: 24, fontFamily: 'Raleway, sans-serif', fontWeight: 700, border: 'none', resize: 'vertical', padding: 0, width: 300}} onChange={e => this.setState({title: e.target.value, edit: true})}placeholder={'Type here a title.'} value={this.state.title} />
                            <input onBlur={this.getMeta} onChange={e => this.setState({url: e.target.value, edit: true})} className="p url" placeholder={"Paste here URL to web-site"} value={this.state.url} />
                            <TextareaAutosize style={{fontSize: 18, fontFamily: 'Montserrat, sans-serif', border: 'none', resize: 'vertical', padding: 0, width: 300}} onChange={e => this.setState({desc: e.target.value, edit: true})} placeholder={"Type here note or something related to web-site"} value={this.state.desc} />
                            {this.state.edit ? <Button marginRight={'12px'} onClick={() => {
                                this.props.createFlowObject({
                                    title: this.state.title,
                                    desc: this.state.desc ? this.state.desc : '',
                                    url: this.state.url,
                                    favicon: this.state.favicon
                                })
                            }} height={'8px'} bgColor={'#3C72FF'}>Create</Button> : ''}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
