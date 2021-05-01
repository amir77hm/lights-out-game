import React, { Component } from 'react'

export default class Cell extends Component {

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.flipCellAround()
    }

    render() {
        return <td className={'cell' + (this.props.isLit ? ' isLit' : "")} onClick={() => { this.handleClick() }}> </td>
    }
}
