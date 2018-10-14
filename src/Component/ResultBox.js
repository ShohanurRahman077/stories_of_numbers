/**
 * Created by Shohanur on 10/10/2018.
 */
import React  from  'react'

const ResultBox = (props) => {

    return(
        <div className="ResultBox">
            <h1>Result</h1>
            <div className="ResultBox">
               {props.result}
            </div>

        </div>
    );
};
export default ResultBox;