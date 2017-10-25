import React, {Component} from 'react';
import './LoginForm.css';
import * as authService from '../services/authService';
import Alert from 'react-s-alert';
import * as validator from '../validation/validator';
import  Modal from 'react-modal';



class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        this.props.closeModalChgPass();
    }


    render() {
        return (
        
            <div className="lgn ibox-content">
                
                <form className="form-horizontal" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Old Password:</label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">New Password:</label>
                        <div className="col-lg-10">
                            <input type="text" className="form-control" 
                             id="DealerId" 
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Confirm Password:</label>
                        <div className="col-lg-10">
                            <input type="password" className="form-control"
                             id="password"
                            />
                        </div>
                    </div>

                    <div className="row">
                    <div className="col-lg-6">
                    </div>
                    <div className="col-lg-3">
                    </div>
                    <div className="lgn-cnl col-lg-3">
                    <div className="col-sm-2">
                    <button  className=".btn-default"  onClick={this.props.closeModalChgPass}>Cancel</button>                    
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

export default ChangePassword;