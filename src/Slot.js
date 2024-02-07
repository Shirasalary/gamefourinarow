import red from '../src/pictures/red.svg'
import black from '../src/pictures/black.svg'
function Slot(props){
    return(

        <div className="slot" x={props.x} y={props.y}>
        {
            props.ch && (
                <div>
                    <div className={props.ch === 'Player 1' ? "redBall" : "blackBall"}></div>
                </div>)
        }
        </div>
    );
}

export default Slot;