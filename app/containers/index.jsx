import React from 'react'
import '../static/css/reset.css'


export default class App extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                    {this.props.children}
            </div>
        )
    }
}