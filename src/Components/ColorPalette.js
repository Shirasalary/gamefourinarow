import React from 'react';
import { CirclePicker } from 'react-color';
function ColorPalette (props){

    const handleColorChange = (value) => {
        let property = 'player1Color';
        if (props.player === 2) {
            property = 'player2Color';
        }
        // קריאה לפונקציה שהועברה דרך ה-props לעדכון הצבע בהתאם
        props.onColorChange(property, value);
    };

    return (
        <div>
            <div>
                <CirclePicker
                    color={props.currentColor}
                    onChangeComplete={(color) => handleColorChange(color.hex)}
                />
            </div>
        </div>
    );
}

    // constructor(props) {
    //     super(props);
    //     this.state  = {
    //         background: this.props.defaultColor
    //     };
    // }
    //
    //
    // handleChangeComplete = (color) => {
    //     this.setState({ background: color.hex });
    // };
    // render() {
    //     return (
    //         <div>
    //             { console.log(this.state.background) }
    //             <div className="colorPicker">
    //                 <CirclePicker  color={ this.state.background }
    //                                onChangeComplete={ this.handleChangeComplete }
    //                 />
    //             </div>
    //         </div>
    //     );
    // }

export default ColorPalette;