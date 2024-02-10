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
        rows: 4,
        columns: 4,
        currentPlayer: 'Player 1',
        showBoard: false,
        countdownValue: 10,
    }

    findEmptyRow(columnNumber) {

        for (let row = this.state.rows - 1; row >= 0; row--) {
            if (!this.state.board[row][parseInt(columnNumber,10)]) {
                return  row;
            }
        }
        return -1;
    }

    turn = (event) => {
       const column = parseInt(event.target.getAttribute('x'), 10);
       const row = this.findEmptyRow(column);

        if (row !== -1){
            this.setBoard(row,column,this.state.currentPlayer);
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
    // checkCol(){
    //     let result = false;
    //     const rows = this.state.board.length;
    //     const columns = this.state.board[0].length;
    //
    //     for (let row = 0; row < rows - 3; row++) {
    //         for (let col = 0; col < columns; col++) {
    //             if (
    //                 this.state.board[row][col] &&
    //                 this.state.board[row][col] === this.state.board[row + 1][col] &&
    //                 this.state.board[row][col] === this.state.board[row + 2][col] &&
    //                 this.state.board[row][col] === this.state.board[row + 3][col]
    //             ) {
    //                 result = true;
    //             }
    //         }
    //     }
    //
    //     return result;
    // }

    // checkCol(){
    //     let result = false;
    //     const rows = this.state.board.length;
    //     const columns = this.state.board[0].length;
    //
    //     for (let col = 0; col < columns; col++) {
    //         for (let row = 0; row <= rows - 4; row++) {
    //             if (
    //                 this.state.board[row][col] &&
    //                 this.state.board[row][col] === this.state.board[row + 1][col] &&
    //                 this.state.board[row][col] === this.state.board[row + 2][col] &&
    //                 this.state.board[row][col] === this.state.board[row + 3][col]
    //             ) {
    //                 result = true;
    //             }
    //         }
    //     }
    //
    //     return result;
    // }

    checkDirection(startRFor, lessRCondition,lessCCondition,
                   addRow1,addRow2,addRow3,
                   addColumn1,addColumn2,addColumn3){
        let result = false;

        for (let row = startRFor; row < this.state.rows -lessRCondition; row++) {

            for (let col = 0; col <= this.state.columns -lessCCondition; col++) {
                if (
                    this.state.board[row][col] &&
                    this.state.board[row][col] === this.state.board[row + addRow1][col + addColumn1] &&
                    this.state.board[row][col] === this.state.board[row + addRow2][col + addColumn2] &&
                    this.state.board[row][col] === this.state.board[row + addRow3][col + addColumn3]
                ) {
                    result = true;
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

    setBoard(row,column,ch){
        this.setState(
            prevState => {
                // יצירת העתק של המטריצה
                const updatedBoard = [...prevState.board.map(row => [...row])];

                // עדכון הערך בשורה הרצויה
                updatedBoard[row][column] = ch;

                // החזרת אובייקט המכיל את המטריצה המעודכנת
                return { board: updatedBoard};

            }

    )

    }

    handleInputChange = (event, property) => {
        const value = event.target.value;
        const numericValue = Math.max(4, parseInt(value, 10));
        this.setSize(property, numericValue);
    }

    setSize = (property, size) => {
        this.setState({
            [property]: size,
        });
    }

    //TODO אחרי שנוסיף את הצבעים צריך לבדוק שנבחרו צבעים שונים ורק אז להתחיל את המשחק
    handleStatGame = () => {
        const board = [];

        for (let i = 0; i < this.state.rows; i++) {
            const row = Array(this.state.columns).fill('');
            board.push(row);
        }

        this.setState({
            showBoard: true,
            board: board
        });

        this.countDown();
    }


    countDown = () => {

        setInterval(() => {
            let currentValue = this.state.countdownValue -1 ;

            if (this.state.countdownValue === 0) {
                this.setPlayers();
                currentValue = 10 ;

            }

            this.setState({
                countdownValue: currentValue
            });
        }, 1000);
    }
    render() {
        return (
            <div className="app">
                <div style={{ display: this.state.showBoard ? 'none' : 'block' }}>
                    <div> Connect Four Game</div>
                    <div> Choose size to the board</div>
                    <div>ROWS: <input type={'number'} value={this.state.rows}
                                      onChange={(event) => this.handleInputChange(event, 'rows')}/></div>
                    <div>COLUMNS: <input type={'number'} value={this.state.columns}
                                         onChange={(event) => this.handleInputChange(event, 'columns')}/></div>

                    <button onClick={this.handleStatGame}>Stat Play!</button>
                </div>

                <div style={{ display: this.state.showBoard ? 'block' : 'none' }}>
                    {this.checkWin() === false ?
                        //כאשר המשחק עדיין רץ
                        <div>
                            <div > {this.state.currentPlayer} move END in {this.state.countdownValue}</div>
                            <div onClick={this.turn}>
                                <Board board={this.state.board}/>
                            </div>

                        </div>
                        :
                        //כאשר המשחק נגמר
                        <div>
                            {this.state.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1'} WIN! :)
                        </div>
                    }
                </div>

            </div>
        );
    }

}

export default Game;