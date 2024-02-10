
import Slot from "./Slot";
function Board(props){

   const widthBall = 115;
    const heightBall = 107;
    const board = props.board;

    return(
        <div>

            <div id="board" style={{width: widthBall * board[0].length , height: heightBall*board.length}}>
                {
                    (board && board.length && board[0].length) ?
                        (
                            board.map((row, i) => {
                                return row.map((ch, column) => {
                                    return <Slot ch={ch} x={column} y={i}/>
                                });

                            })
                    ): null


                }
            </div>
        </div>

    );
}

export default Board;