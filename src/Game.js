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
        currentPlayer: "Red",
        nextPlayer : "Black",
        gameOver: false
}
    findEmptyRow(columnNumber, matrix) {
        // עבור על כל השורות בעמודה הנתונה
        for (let row = matrix.length-1; row >= 0; row--) {
            // בדוק אם הערך במקום הנתון בשורה הוא ריק
            if (!matrix[row][columnNumber]) {
                // אם כן, החזר את מספר השורה
                return  row;
            }
        }
        // אם אין שורות פנויות, החזר -1 כדי לסמנן שאין שורה פנויה
        return -1;
    }

    turn = (event) => {
       const column = event.target.getAttribute('x');
       const row = this.findEmptyRow(column,this.state.board);

        if (row !== -1){
            this.setBoard(row,column,this.state.currentPlayer);
        }
        this.checkWin();
       this.setPlayers();
    }

    checkWin(){
        // if (
        // //בדיקת שורות
        // this.checkDirection(0,0,4,
        //     0,0,0,1,2,3))
        // {
        //     //בדיקת עמודות
        //     // this.checkDirection(0,4,0,
        //     //     1,2,3,0,0,0)||
        //     // //בדיקת אלכסון יורד
        //     // this.checkDirection(0,4,4,
        //     //     1,2,3,1,2,3)||
        //     // //בדיקת אלכסון עולה
        //     // this.checkDirection(3,0,4
        //     //     -1,-2,-3,1,2,3)
        //     console.log('יש ניצחון בשורה')
        //
        // }

        // let result = false;
        const rows = this.state.board.length;
        const columns = this.state.board[0].length;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col <= columns - 4; col++) {
                if (
                    this.state.board[row][col] &&
                    this.state.board[row][col] === this.state.board[row][col + 1] &&
                    this.state.board[row][col] === this.state.board[row][col + 2] &&
                    this.state.board[row][col] === this.state.board[row][col + 3]
                ) {
                    this.setGameOver();
                    break;
                }
            }
        }

        // if (result){
        //     this.setGameOver();
        // }
    }

    checkDirection(startRFor, lessRCondition,lessCCondition,
                   addRow1,addRow2,addRow3,
                   addColumn1,addColumn2,addColumn3){
        let result = false;
        const rows = this.state.board.length;
        const columns = this.state.board[0].length;

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

    setGameOver(){
        this.setState(
            {gameOver : true}
        )

        console.log('gameOver');
    }
    setPlayers(){
        this.setState(prevState => ({
            currentPlayer: prevState.nextPlayer,
            nextPlayer: prevState.currentPlayer
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
                {this.state.gameOver === false ?
                    //כאשר המשחק עדיין רץ
                    <div>
                        <div className="app"> {this.state.currentPlayer} Move</div>
                        <div onClick={ !this.state.gameOver && this.turn}>
                            <Board board={this.state.board}/>
                        </div>

                    </div>
                    :
                    //כאשר המשחק נגמר
                    <div> {this.state.nextPlayer} WIN! :) </div>
                }
            </div>
        );
    }

}
export default Game;