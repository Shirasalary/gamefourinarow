
import Slot from "./Slot";
function Board(props){

    return(
        <div id="board" >
            {
                props.board.map((row , i) => {
                    return row.map((ch , column) => {
                         return <Slot ch={ch} x={column} y={i}/>
                    });

                })
            }
        </div>
    );
}

export default Board;