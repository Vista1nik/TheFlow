import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'

import Gravatar from 'react-gravatar'

import firebase, { firestore } from 'firebase'
import uuid from 'uuid/v4'
import { height } from 'window-size'



export default class Dashboard extends Component {

    state = {
        flows: [],
        userid: null
    }

    componentDidMount() {
        let db = firebase.firestore()
        db.collection('gallery')
        .onSnapshot(data => {
            this.setState({
                flows: []
            })
            if (data.empty) {
                this.setState({
                    flows: false
                })
            }
            let flows = []
            data.forEach(flow => {
                let flowData = flow.data()
                flows.push(flowData)
                console.log(flow.data())
            })
            if (data.size == flows.length) {
                this.setState({
                    flows: flows
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

                    .dashboard {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 48px;
                        width: 100%;
                    }
                    
                    .dashboard-art {
                        height: 400px;
                    }

                    .dashboard-grid {
                        margin-top: 48px;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-rows: repeat(3, 1fr);
                        grid-column-gap: 20px;
                        grid-row-gap: 20px;
                    }


                    @media screen and (max-width: 425px) {
                        .dashboard-art {
                            height: 300px;
                        }
                    }


                    @media screen and (max-width: 1092px) {

                        .dashboard-grid {
                            margin-top: 48px;
                            display: grid;
                            grid-template-columns: 1fr;
                            grid-template-rows: 1fr;
                            grid-column-gap: 20px;
                            grid-row-gap: 20px;
                            justify-items: center;
                            
                        }
                    }
                `}</style>
                <Header shadow={true} />
                <div className="dashboard">
                    <div>
                        <div align="center">
                            <img className='dashboard-art' src={'/static/gallery.svg'} />
                            <h1>Welcome to the Gallery</h1>
                            <p>Here you can find flows from other people!</p>
                            <p>You can share you Flow to the Gallery on your flow page.</p>
                            <p>Click on card to open flow.</p>
                        </div>
                        {!this.state.flows[0] ? 
                            <div align="center">
                                <img src={'/static/loading.gif'} />
                            </div> 
                            : 
                            <div className="dashboard-grid">
                                {this.state.flows.map(flow => <FlowCard userid={flow.userid} flowid={flow.flowid} md5={flow.emailhash} />)}
                            </div>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

class FlowCard extends Component {

    state = {
        title: '',
        desc: '',
        md5: this.props.md5
    }
    
    componentDidMount() {
        let db = firebase.firestore()
        db.collection('flows').doc(this.props.userid).collection('userflows').doc(this.props.flowid)
        .onSnapshot(data => {
            let flow = data.data()
            console.log(flow)
            this.setState({
                title: flow.flowname,
                desc: flow.flowdesc
            })
        })
    }
    
    render() {
        return (
            <div>
                <style jsx>{`
                    h1 {
                        font-size: 24px;
                        font-family: 'Raleway', sans-serif;
                        margin: 10px;
                        margin: 10px 0;
                    }

                    p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                        display: block;
                        margin: 10px 0;
                    }

                    a {
                        color: #000;
                        text-decoration: none;
                    }

                    input {
                        border: solid 0px;
                        display: block;
                        margin: 10px 0;
                        padding: 0;
                    }

                    .details {
                        width: 100%;
                    }

                    /* For input */

                    .h1 {
                        font-size: 24px;
                        font-family: 'Raleway', sans-serif;
                        margin-top: 10px;
                        font-weight: 700;
                    }

                    .p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                        margin-top: 10px;
                        margin-bottom: 16px;
                    }

                    .card {
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                        width: fit-content;
                        border-radius: 8px;
                        width: 300px;
                        display: flex;
                    }    
                    
                    .card-action {
                        display: flex;
                    }

                    .avatar {
                        border-radius: 50%;
                        height: 32px;
                        width: 32px;
                        margin-right: 12px;
                    }
                `}</style>
                <a href={`/share?flowid=${this.props.flowid}&userid=${this.props.userid}`}>
                <div className='card'>
                    <div className="details">
                        {this.state.title == '' ? 
                        <div align="center">
                            <img style={{height: 48}} src={'/static/loading.gif'} />
                        </div>
                        :
                        <div>
                            <h1 className="h1">{this.state.title}</h1>
                            <p className="p">{this.state.desc}</p>
                            <Gravatar className="avatar" md5={this.props.md5} />
                        </div>
                        }
                    </div>
                    <a style={{marginTop: 10}} href={`/share?flowid=${this.props.flowid}&userid=${this.props.userid}`}>
                        <img src="/static/right-icon.svg" />
                    </a>
                </div>
                </a>
            </div>
        )
    }
}