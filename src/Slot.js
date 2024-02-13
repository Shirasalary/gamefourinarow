import red from '../src/pictures/red.svg'
import black from '../src/pictures/black.svg'

function Slot(props) {
    return (

        <div className="slot" x={props.x} y={props.y}>
            {
                props.ch && (
                    <div>
                        <div className='ball' style={{background:props.ch === 'Player 1' ? props.player1Color : props.player2Color}}></div>
                    </div>)
            }
        </div>
    );
}


export default Slot;