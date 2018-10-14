/**
 * Created by Shohanur on 10/11/2018.
 */
import React, { Component } from 'react';
/*
const history = (props) => {

    return(
            <div >
                <div >{props.name}</div>
                <div >{props.result}</div>
            </div>

    );
};
*/

class History extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {

        return (
            <div className="History">
                <div>Number:  {this.props.number} </div>
        <div>Result: {this.props.result}</div>


            </div>
        );


    }
}

export default History;