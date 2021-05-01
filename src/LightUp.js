import React, { Component } from 'react'
import Cell from "./Cell";

export default class LightUp extends Component {
    constructor(props) {
        super(props)

        this.createBoard = this.createBoard.bind(this)
    }

    static defaultProps = {
        nCols: 5,
        nRows: 5,
        chanceOfLightOf: .3
    }

    state = {
        hasWon: false,
        board: this.createBoard()
    }

    createBoard() {
        let board = []
        for (let i = 0; i < this.props.nCols; i++) {
            let row = []
            for (let j = 0; j < this.props.nRows; j++) {
                let randomLight = Math.random() < this.props.chanceOfLightOf
                row.push(randomLight)
            }
            board.push(row)
        }
        return board
    }

    flipCellAround = (coords) => {
        let { nRows, nCols } = this.props
        let board = this.state.board
        let [y, x] = coords.split('-').map(Number)

        function replace(y, x) {
            if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
                board[y][x] = !board[y][x]
            }
        }

        replace(y, x)
        replace(y, x - 1)
        replace(y, x + 1)
        replace(y - 1, x)
        replace(y + 1, x)

        // update state when replacing
        this.setState({ board })

        // logic of game-winning
        let hasWon = this.state.board.every(row => row.every(cell => !cell))

        if (hasWon) {
            this.setState({ hasWon })
        }
    }


    render() {

        // generate jsx content
        let board = []
        for (let i = 0; i < this.props.nCols; i++) {
            let row = []
            for (let j = 0; j < this.props.nRows; j++) {
                let coord = `${i}-${j}`
                let cell = <Cell isLit={this.state.board[i][j]} key={coord} flipCellAround={() => { this.flipCellAround(coord) }} />
                row.push(cell)
            }
            board.push(<tr key={i}>{row}</tr>)
        }

        return (
            <div className='lightUp'>
                <div className='title'>
                    <h1 className='heading'>lights up</h1>
                </div>
                <table>
                    <tbody>
                        {this.state.hasWon ? <div className='winnig'>
                            <span className='txt'>you win</span>
                        </div> : board}
                    </tbody>
                </table>
            </div>
        )
    }
}
