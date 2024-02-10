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
        showParameters: true,
        showBoard: false
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
        if (!this.state.board|| !this.state.board.length || !this.state.board[0].length) {
            result = false;
        }else {
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
        }

        return result;
    }

    checkDirection(startRFor, lessRCondition,lessCCondition,
                   addRow1,addRow2,addRow3,
                   addColumn1,addColumn2,addColumn3){
        let result = false;
        if (!this.state.board|| !this.state.board.length || !this.state.board[0].length) {
            result = false;
        }else {
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

    // handleInputBoardSizeChange = (event,typeByPosition) => {
    //
    //     const value = event.target.value;
    //     const numericValue = Math.max(4, parseInt(value, 10));
    //     this.setBoardSize(numericValue,typeByPosition);
    //
    // }
    //
    // setBoardSize(size,typeByPosition){
    //     const current = this.state.boardSize;
    //     current[typeByPosition] = size;
    //
    //     this.setState({
    //         boardSize: current
    //     });
    // }

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
            showParameters: false,
            showBoard: true,
            board: board
        });
    }

    render() {
        return (
            //לא צריך להוסיף תכונה לגודל פשוט ישר ניצור את הלוח
            // בonChange נבדוק תקינות קלט מינימום 4
            //כדי שהלוח יהיה דינמי הרוחב הוא 100 והגובה הוא 107
            <div>
                <div style={{ display: this.state.showParameters ? 'block' : 'none' }}>
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

            </div>
        );
    }

}

export default Game;