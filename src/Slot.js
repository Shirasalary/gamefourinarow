
function Slot(props) {
    return (

        <div className='slot' style={{background:ball()}} x={props.x} y={props.y}>
            {
                props.ch && (
                    <div>
                        <div className='slot' ></div>
                    </div>)
            }
        </div>
    );

    //props.ch === 'Player 1' ? props.player1Color : props.player2Color
//style={{background: 'white'}}
    function ball(){
       let background = 'white';
       if (props.ch === 'Player 1'){
           background = props.player1Color;
       }else if (props.ch === 'Player 2'){
           background = props.player2Color;
       }
       return background;
    }
}




export default Slot;