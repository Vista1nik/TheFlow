import React, { Component } from 'react'

import Header from '../components/header'
import Button from '../components/button'
import Footer from '../components/footer'

import firebase, { firestore } from 'firebase'



export default class Dashboard extends Component {

    state = {
        flows: [],
        userid: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let db = firebase.firestore()
                // Global flows and user flows
                db.collection('flows').doc(user.uid).collection('userflows').get()
                .then(data => {
                    if (data.empty) {
                        this.setState({
                            flows: false
                        })
                    }
                    data.forEach(flow => {
                        let flows = []
                        let flowData = flow.data()

                        flows.push(Object.assign(flowData, {id: flow.id}))
                        this.setState({
                            flows: flows,
                            userid: user.uid
                        })
                    })

                })
            } else {
                console.log("No user detected!")
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

                    .dashboard {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 48px;
                        width: 100%;
                    }

                    .dashboard-grid {
                        margin-top: 48px;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-rows: repeat(3, 1fr);
                        grid-column-gap: 20px;
                        grid-row-gap: 20px;
                    }

                `}</style>
                <Header shadow={true} />
                <div className="dashboard">
                    <div>
                        <div align="center">
                            <h1>Dashboard</h1>
                            <p>Welcome! Here you can see your flows and create new ones!</p>
                        </div>
                        <div className="dashboard-grid">
                            {this.state.flows.map(flow => <FlowCard userid={this.state.userid} id={flow.id} title={flow.flowname} desc={flow.flowdesc} />)}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

class FlowCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false,
            title: this.props.title,
            desc: this.props.desc
        }
    }
    
    updateFlowInfo = () => {
        let db = firebase.firestore()
        db.collection('flows').doc(this.props.userid).collection('userflows').doc(this.props.id)
        .update({
            flowname: this.state.title,
            flowdesc: this.state.desc
        })
        .then(res => {
            window.location = '/dashboard'
        })
    }

    render() {
        return (
            <div>
                <style jsx>{`
                    h1 {
                        font-size: 24px;
                        font-family: 'Raleway', sans-serif;
                        display: block;
                        margin: 10px 0;
                    }

                    p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                        display: block;
                        margin: 10px 0;
                    }

                    input {
                        border: solid 0px;
                        display: block;
                        margin: 10px 0;
                        padding: 0;
                    }

                    /* For input */

                    .h1 {
                        font-size: 24px;
                        font-family: 'Raleway', sans-serif;
                        font-weight: 700;
                    }

                    .p {
                        font-size: 18px;
                        font-family: 'Montserrat', sans-serif;
                    }

                    .card {
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                        width: fit-content;
                        border-radius: 8px;
                        min-width: 300px;
                        display: flex;
                        flex-direction: column;
                    }    
                `}</style>
                <div className='card'>
                    <div>
                        <input onChange={e => this.setState({title: e.target.value, edit: true})} className="h1" placeholder={this.props.title} value={this.state.title} />
                        <input onChange={e => this.setState({desc: e.target.value, edit: true})} className="p" placeholder={this.props.desc} value={this.state.desc} />
                        {this.state.edit ? <Button onClick={this.updateFlowInfo} height={'8px'} bgColor={'#3C72FF'}>Save changes</Button> : ''}
                    </div>
                </div>
            </div>
        )
    }
}
