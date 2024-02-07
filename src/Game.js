import React from "react";
import Board from "./Board";
import * as events from "events";
import board from "./Board";
class Game extends React.Component {

    state ={
        board :
            [ ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','',''],
            ['','','','','','','']]
        ,
        currentPlayer: 'Player 1'
}
    findEmptyRow(columnNumber, matrix) {
        for (let row = matrix.length-1; row >= 0; row--) {
            if (!matrix[row][columnNumber]) {
                return  row;
            }
        }
        return -1;
    }

    turn = (event) => {
       const column = parseInt(event.target.getAttribute('x'), 10);
       const row = this.findEmptyRow(column,this.state.board);

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
       this.checkCol()||
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

    checkCol(){
        let result = false;
        const rows = this.state.board.length;
        const columns = this.state.board[0].length;

        for (let col = 0; col < columns; col++) {
            for (let row = 0; row <= rows - 4; row++) {
                if (
                    this.state.board[row][col] &&
                    this.state.board[row][col] === this.state.board[row + 1][col] &&
                    this.state.board[row][col] === this.state.board[row + 2][col] &&
                    this.state.board[row][col] === this.state.board[row + 3][col]
                ) {
                    result = true;
                }
            }
    }
        return result;
    }

    checkDirection(startRFor, lessRCondition,lessCCondition,
                   addRow1,addRow2,addRow3,
                   addColumn1,addColumn2,addColumn3){
        let result = false;
        let rows = this.state.board.length;
        let columns = this.state.board[0].length;

        for (let row = startRFor; row < rows -lessRCondition; row++) {

            for (let col = 0; col <= columns -lessCCondition; col++) {
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
            currentPlayer: prevState.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1'
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


    render() {
        return (
            <div >
                { this.checkWin() === false ?
                    //כאשר המשחק עדיין רץ
                    <div>
                        <div className="app"> {this.state.currentPlayer} Move</div>
                        <div onClick={this.turn}>
                            <Board board={this.state.board}/>
                        </div>

                    </div>
                    :
                    //כאשר המשחק נגמר
                    <div className="app">
                        {this.state.currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1'} WIN! :)
                    </div>
                }
            </div>
        );
    }

}
export default Game;