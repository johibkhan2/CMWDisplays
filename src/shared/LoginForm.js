import React, {Component} from 'react';
import Popup from 'react-popup';
import './PopUp.css';
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.defaultValue
        };

        this.onChange = (e) => this._onChange(e);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.userName) {
            this
                .props
                .onChange(this.state.userName);
        }
    }

    _onChange(e) {
        let userName = e.target.userName;
        this.setState({userName: userName});
        console.log("userName"+userName);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

    }


    render() {
        return (
            <div className="lgn ibox-content">
                
                <form className="form-horizontal" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label className="col-lg-2 control-label"></label>
                        <div className="col-lg-10">

                            <input type="radio" name="dealer" value={this.state.userName}/>
                            <span className="txt-clr"> Corporate User&nbsp;&nbsp;&nbsp;
                            </span>
                            <input type="radio" name="dealer"/>
                            <span className="txt-clr"> Dealer User
                            </span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">UserName:</label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"

/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Dealer&nbsp;Id:</label>
                        <div className="col-lg-10">
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Password:</label>
                        <div className="col-lg-10">
                            <input type="password" className="form-control"/>
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-lg-6">
                    </div>
                    <div className="col-lg-3">
                    </div>
                    <div className="lgn-cnl col-lg-3">
                    <div className="col-sm-2">
                    <button  className=".btn-default"  onClick={this.props.closeModal}>Cancel</button>                    
                    </div>
                    <div className="col-sm-1">
                    </div>
                    <div className="col-sm-2">                 
                    <button  className=".btn-default"  onClick={this.handleSubmit}>LogIn</button>  
                    </div> 
                    </div>                   
                    </div>

                </form>
            </div>
        );
    }
}

export default LoginForm;