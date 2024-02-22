import React from "react";
import Board from "./Board";
import * as events from "events";
import board from "./Board";
import Slot from "./Slot";
import ColorPalette from "./ColorPalette";

class Game extends React.Component {

    state = {
        board:
            [['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', ''],
                ['', '', '', '']]
        ,
        currentPlayer: 'Player 1',
        showBoard: false,
        countdownValue: 10,
        player1Color: "#e91e63",
        player2Color: "#2196f3",
        intervalId: null,
        isCorrectBoardSize: true
    }


    findEmptyRow(columnNumber) {
        for (let row = this.state.board.length - 1; row >= 0; row--) {
            if (!this.state.board[row][parseInt(columnNumber, 10)]) {
                return row;
            }
        }
        return -1;
    }

    isEquals = () => {
        let isEquals = true;
        for (let i = 0; i < this.state.board.length; i++) {
            for (let j = 0; j < this.state.board[i].length; j++) {
                if (this.state.board[i][j] === '') {
                    console.log(isEquals + " game is not over")
                    return false;
                }
            }
        }

        return true;
    }
    round = (event) => {

        const column = parseInt(event.target.getAttribute('x'), 10);
        const row = this.findEmptyRow(column);

        if (row !== -1){
            this.setBallInBoard(row,column,this.state.currentPlayer);
            this.setPlayers();
        }

    }


    checkWin() {

        let result = false;
        if (
            //בדיקת שורות
            this.checkDirection(0, 0, 4,
                0, 0, 0, 1, 2, 3) ||
            //בדיקת עמודות
            this.checkDirection(0, 3, 0,
                1, 2, 3, 0, 0, 0) ||
            //בדיקת אלכסון יורד
            this.checkDirection(0, 3, 4,
                1, 2, 3, 1, 2, 3) ||
            //בדיקת אלכסון עולה
            this.checkDirection(3, 0, 4,
                -1, -2, -3, 1, 2, 3)) {
            result = true;
        }

        return result;

    }

    checkDirection(rowStartValue, lessRowCondition, lessColumnCondition, addRow1, addRow2, addRow3,
                   addColumn1, addColumn2, addColumn3) {
        let result = false;
        const rows = this.state.board.length;
        const columns = this.state.board[0].length;

        for (let row = rowStartValue; row < rows - lessRowCondition; row++) {

            for (let col = 0; col <= columns - lessColumnCondition; col++) {
                if (this.state.board[row][col]) {
                    if (this.state.board[row][col] === this.state.board[row + addRow1][col + addColumn1] &&
                        this.state.board[row][col] === this.state.board[row + addRow2][col + addColumn2] &&
                        this.state.board[row][col] === this.state.board[row + addRow3][col + addColumn3]) {
                        result = true;
                    }

                }
            }
        }

        return result;
    }


    setPlayers() {
        this.setState(prevState => ({
            currentPlayer: prevState.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1',
            countdownValue: 10

        }));
    }

    setBallInBoard(row, column, ch) {
        this.setState(
            prevState => {
                const updatedBoard = [...prevState.board.map(row => [...row])];
                updatedBoard[row][column] = ch;
                return {board: updatedBoard};
            })
    }

    handleInputSizeBoardChange = (event, property) => {

        let isCorrect = true;
        const value = event.target.value;
        if (value >= 4 && value <= 10) {
            this.setBoard(property, value);

        } else {
            isCorrect = false;
            //alert("Enter a number between 4-10")
        }
        this.setState({
            isCorrectBoardSize: isCorrect
        })

    }

    setBoard = (property, value) => {
        let newRows = this.state.board.length;
        let newColumns = this.state.board[0].length;
        let board = [];

        if (property === 'rows') {
            newRows = value;
        } else {
            newColumns = value;
        }

        for (let i = 0; i < newRows; i++) {
            const row = Array(newColumns).fill('');
            board.push(row);
        }

        this.setState({
            board: board
        });
    }

    setColor = (property, value) => {

        this.setState({
            [property]: value
        });
    }

    handleStatGameAfterMenu = (position) => {
        if (this.state.player1Color !== this.state.player2Color) {
            this.setState({
                showBoard: true
            });

            this.countDown();
        }
    }

    handleStatGameAgain = () => {
        clearInterval(this.state.intervalId);
        this.setState({
            board:
                [['', '', '', ''],
                    ['', '', '', ''],
                    ['', '', '', ''],
                    ['', '', '', '']]
            ,
            currentPlayer: 'Player 1',
            showBoard: false,
            countdownValue: 10,
            player1Color: "#e91e63",
            player2Color: "#2196f3",
            intervalId: null
        });
    }

    countDown = () => {

        const intervalId = setInterval(() => {
            let currentValue = this.state.countdownValue - 1;

            if (this.state.countdownValue === 0) {
                this.setPlayers();
                currentValue = 10;
            }
            this.setState({
                countdownValue: currentValue
            });
        }, 1000);

        this.setState({
            intervalId: intervalId
        });

    }


    render() {
        return (
            <div className="app">
                <div id={"title"}></div>

                {/*תפריט המשחק */}
                <div style={{display: this.state.showBoard ? 'none' : 'block'}}>
                    <div className={'row-container'}>
                        <div>ROWS: <input type={'number'} value={this.state.board.length}
                                          onChange={(event) => this.handleInputSizeBoardChange(event, 'rows')}/></div>
                        <div>COLUMNS: <input type={'number'} value={this.state.board[0].length}
                                             onChange={(event) => this.handleInputSizeBoardChange(event, 'columns')}/>
                        </div>

                    </div>
                    <div>
                        <div className={'row-container'}>
                            <div> Player 1 color</div>
                            <div>Player 2 color</div>
                        </div>
                        <div className={'row-container'}>
                            <ColorPalette player={1} currentColor={this.state.player1Color}
                                          onColorChange={this.setColor}/>
                            <ColorPalette player={2} currentColor={this.state.player2Color}
                                          onColorChange={this.setColor}/>
                        </div>

                        <p style={{display: this.state.isCorrectBoardSize === false? 'block' : 'none'}}>Please choose number between 4 to 10</p>
                        <p style={{display: this.state.player1Color === this.state.player2Color ? 'block' : 'none'}}>Please
                            choose different colors</p>
                    </div>

                    <button className={'button'} onClick={this.handleStatGameAfterMenu}>Start Play!</button>
                </div>


                {/* משחק*/}
                <div style={{display: this.state.showBoard ? 'block' : 'none'}}>
                    {

                        this.checkWin() === false && this.isEquals() === false ?
                            //כאשר המשחק עדיין רץ
                            <div>
                                <div> {this.state.currentPlayer} move END in {this.state.countdownValue}</div>
                                <div onClick={this.round}>
                                    <Board board={this.state.board} player1Color={this.state.player1Color}
                                           player2Color={this.state.player2Color}/>
                                </div>

                            </div>
                            :
                            //כאשר המשחק נגמר
                            <div>
                                <div style={{display: this.isEquals() ? 'block' : 'none'}}>
                                    <div>Equality, no one won :(</div>
                                    <div>Press restart to try AGAIN :)</div>
                                </div>
                                <div style={{display: this.checkWin() ? 'block' : 'none'}}>
                                    {this.state.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1'} WIN! :)
                                </div>

                            </div>
                    }
                    <button className={'button'} onClick={this.handleStatGameAgain}>Restart :)</button>
                </div>

            </div>
        );
    }

}

export default Game;