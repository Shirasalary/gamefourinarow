
import Slot from "./Slot";
function Board(props){

   const widthBall =55;
    const heightBall = 55;
    const board = props.board;

    return(
        <div>

            <div id="board" style={{width: widthBall * board[0].length , height: heightBall*board.length}}>
                {
                    (board && board.length && board[0].length) ?
                        (
                        board.map((row, i) => {
                            return row.map((ch, column) => {
                                return <Slot ch={ch} x={column} y={i} player1Color={props.player1Color} player2Color={props.player2Color}/>
                            });

                        })
                    ): null


                }
            </div>
        </div>

    );
}

export default Board;