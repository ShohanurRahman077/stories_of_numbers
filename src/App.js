import React, { Component } from 'react';
import './App.css';
import './Component/History.css';
import axios from 'axios'
import ResultBox from './Component/ResultBox'
import History from './Component/History'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

            value: '',
            result:'',
            count: 0,
            buttonStatus: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);

    }


    handleChange(event) {
        this.setState({value: event.target.value});
    }
    buttonHandler(){

        var doesShow=this.state.buttonStatus;
        console.log(doesShow);
        this.setState({buttonStatus: !doesShow});
    }

    handleSubmit(event) {
       // alert('A name was submitted: ' + this.state.value);

        event.preventDefault();
        const data = this.state.value;
        if(data!==''){
            const url="http://numbersapi.com/" +data;

            axios.get(url)
                .then(res => {
                    if (res.status===200){
                        this.setState({result: res.data} );

                        if (localStorage.getItem('history')){
                            let data1 = [{
                                name: data,
                                result:res.data,
                            }]
                            var x = JSON.parse(localStorage.getItem('history'));

                            var array3 = x.concat(data1);
                            localStorage.setItem('history', JSON.stringify(array3));
                        }
                        else {
                            let data1 = [{
                                name: data,
                                result:res.data,
                            }]
                            localStorage.setItem('history', JSON.stringify(data1));
                        }
         }



                    else {
                        this.setState({result: ''} );
                    }


                })
        }

        else{
            alert('Please give input a number' );

        }

    }



    render() {
        let posts = JSON.parse(localStorage.getItem('history'));
        let history = null;
        var countries = [{
            name: '',
            result:'',
        }];
        history = Object.keys(posts).forEach(function (key) {
            var x = [{
                name:posts[key]['name'],
                result:posts[key]['result']
            }]

            countries = countries.concat(x);

        });

        history = countries.map((obj,index) => {
           if(obj['name']!==''){
            return(
                <History
            key={index}
            number={obj['name']}
            result={obj['result']}
                />
        )
        }



        });


        return (
            <div className="App">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Number:
                  <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="See Result" />
              </form>
                {this.state.result!==''?<ResultBox result={this.state.result}/>:<ResultBox result="No number is given yet"/>}
                 <button className="buttonC" onClick={this.buttonHandler}>Search History</button>
                { this.state.buttonStatus ?
                     <div className="History">
                     {history}
                    </div> :null
                }

            </div>
        );
    }
}

export default App;
