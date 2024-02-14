import React from "react";
import Board from "./Board";
import * as events from "events";
import board from "./Board";
import Slot from "./Slot";
class Game extends React.Component {

    state ={
        board :
            [ ['','','',''],
                ['','','',''],
                ['','','',''],
                ['','','','']]
        ,
        currentPlayer: 'Player 1',
        showBoard: false,
        countdownValue: 10,
        player1Color :"#ff0000",
        player2Color :"#000000",
        intervalId: null
    }

    findEmptyRow(columnNumber) {
        for (let row = this.state.board.length - 1; row >= 0; row--) {
            if (!this.state.board[row][parseInt(columnNumber,10)]) {
                return  row;
            }
        }
        return -1;
    }

    round = (event) => {
       const column = parseInt(event.target.getAttribute('x'), 10);
       const row = this.findEmptyRow(column);

        if (row !== -1){
            this.setBallInBoard(row,column,this.state.currentPlayer);
        }

       this.setPlayers();
    }

    checkWin(){

        let result = false;
        if (
        //בדיקת שורות
        this.checkDirection(0,0,4,
            0,0,0,1,2,3)||
        //בדיקת עמודות
           this.checkDirection(0,3,0,
               1,2,3,0,0,0)||
        //בדיקת אלכסון יורד
        this.checkDirection(0,3,4,
            1,2,3,1,2,3)||
        //בדיקת אלכסון עולה
        this.checkDirection(3,0,4,
            -1,-2,-3,1,2,3))
        {
            result = true;
        }

        return result;

    }

    checkDirection(rowStartValue, lessRowCondition,lessColumnCondition, addRow1,addRow2,addRow3,
                   addColumn1,addColumn2,addColumn3){
        let result = false;
        const rows = this.state.board.length;
        const columns = this.state.board[0].length;

        for (let row = rowStartValue; row < rows -lessRowCondition; row++) {

            for (let col = 0; col <= columns -lessColumnCondition; col++) {
                if (this.state.board[row][col]) {
                    if ( this.state.board[row][col] === this.state.board[row + addRow1][col + addColumn1] &&
                        this.state.board[row][col] === this.state.board[row + addRow2][col + addColumn2] &&
                        this.state.board[row][col] === this.state.board[row + addRow3][col + addColumn3]){
                        result = true;
                    }

                }
            }
        }

        return result;
    }


    setPlayers(){
        this.setState(prevState => ({
            currentPlayer: prevState.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1',
            countdownValue: 10

        }));
    }

    setBallInBoard(row, column, ch){
        this.setState(
            prevState => {
                const updatedBoard = [...prevState.board.map(row => [...row])];
                updatedBoard[row][column] = ch;
                return { board: updatedBoard};
            })
    }

    handleInputSizeBoardChange = (event, property) => {
        const value = event.target.value;
        const numericValue = Math.max(4, parseInt(value, 10));
        this.setBoard(property, numericValue);
    }

    setBoard = (property, value) => {
        let newRows = this.state.board.length;
        let newColumns = this.state.board[0].length;
        const board = [];

        if (property === 'rows'){
            newRows = value;
        }else {
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

    setValueByProperty = (property, value) => {
        this.setState({
            [property]: value
        });
    }

    handleStatGameAfterMenu = (position) => {
        if (this.state.player1Color !== this.state.player2Color ){
            this.setState({
                showBoard: true
            });

            this.countDown();
        }
    }

    handleStatGameAgain = () =>{
        clearInterval(this.state.intervalId);
        this.setState({
            board :
                [ ['','','',''],
                    ['','','',''],
                    ['','','',''],
                    ['','','','']]
            ,
            currentPlayer: 'Player 1',
            showBoard: false,
            countdownValue: 10,
            player1Color :"#ff0000",
            player2Color :"#000000",
            intervalId: null
        });
    }

    countDown = () => {

        const intervalId = setInterval(() => {
            let currentValue = this.state.countdownValue -1 ;

            if (this.state.countdownValue === 0) {
                this.setPlayers();
                currentValue = 10 ;
            }
            this.setState({
                countdownValue: currentValue
            });
        }, 1000);

        this.setState({
            intervalId: intervalId
        });

    }

    // function areColorsSimilar(color1, color2, threshold = 50) {
    //     const rgb1 = hexToRgb(color1);
    //     const rgb2 = hexToRgb(color2);
    //
    //     for (let i = 0; i < 3; i++) {
    //         if (Math.abs(rgb1[i] - rgb2[i]) > threshold) {
    //             return false;
    //         }
    //     }
    //
    //     return true;
    // }
    //
    // function hexToRgb(hex) {
    //     // המרת צבע מ-HEX ל-RGB
    //     const bigint = parseInt(hex.substring(1), 16);
    //     const r = (bigint >> 16) & 255;
    //     const g = (bigint >> 8) & 255;
    //     const b = bigint & 255;
    //
    //     return [r, g, b];
    // }


    render() {
        return (
            <div className="app">

                {/*תפריט המשחק */}
                <div style={{display: this.state.showBoard ? 'none' : 'block'}}>
                    <div> Connect 4 Game</div>
                    <div>
                        <div> Choose size to the board</div>
                        <div>ROWS: <input type={'number'} value={this.state.board.length}
                                          onChange={(event) => this.handleInputSizeBoardChange(event, 'rows')}/></div>
                        <div>COLUMNS: <input type={'number'} value={this.state.board[0].length}
                                             onChange={(event) => this.handleInputSizeBoardChange(event, 'columns')}/></div>

                    </div>
                    <div>
                        <div>Choose your players color:</div>
                        <div> Player 1 color <input type="color" value={this.state.player1Color}
                                                    onChange={(event) =>
                                                        this.setValueByProperty(  'player1Color', event.target.value)}/>
                        </div>
                        <div> Player 2 color <input type="color" value={this.state.player2Color}
                                                    onChange={(event) =>
                                                        this.setValueByProperty( 'player2Color',event.target.value)}/>
                        </div>
                        <p style={{display: this.state.player1Color === this.state.player2Color ? 'block' : 'none'}}>Please choose different colors</p>
                    </div>

                    <button onClick={this.handleStatGameAfterMenu}>Stat Play!</button>
                </div>

                {/* משחק*/}
                <div style={{display: this.state.showBoard ? 'block' : 'none'}}>
                    {this.checkWin() === false ?
                        //כאשר המשחק עדיין רץ
                        <div>
                            <div> {this.state.currentPlayer} move END in {this.state.countdownValue}</div>
                            <div onClick={this.round}>
                                <Board board={this.state.board} player1Color={this.state.player1Color} player2Color={this.state.player2Color}/>
                            </div>

                        </div>
                        :
                        //כאשר המשחק נגמר
                        <div>
                            <div>
                                {this.state.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1'} WIN! :)
                            </div>
                            <button onClick={this.handleStatGameAgain}>AGAIN :) </button>
                        </div>
                    }
                </div>

            </div>
        );
    }

}

export default Game;