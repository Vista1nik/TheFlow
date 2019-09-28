import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <div>
                <style jsx global>{`
                    
                    body {
                        margin: 0;
                    }

                    .header {
                        height: 54px;
                        display: flex;
                        padding: 12px 24px;
                        align-items: center;
                        box-shadow: ${this.props.shadow ? '0px 2px 4px rgba(0, 0, 0, 0.1);' : ''}
                    }    
                `}</style>
                <div className='header'>
                    <div>
                        <img src="/static/logo.svg" />
                        <div className="links">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
