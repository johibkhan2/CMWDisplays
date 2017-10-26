import React, {Component} from 'react';
import './ChangePassword.css';
import * as authService from '../services/authService';
import Alert from 'react-s-alert';
import * as validator from '../validation/validator';
import  Modal from 'react-modal';

        // Blank = 0,
        // VeryWeak = 1,
        // Weak = 2,
        // Medium = 3,
        // Strong = 4,
        // VeryStrong = 5

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword:'',
            newPassword:'',
            confirmPassword:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    isValid(oldPassword, newPassword, confirmPassword){
    if (this.isRequired(oldPassword, newPassword,confirmPassword)) {
        const score = validator.getPasswordScore(newPassword);
        console.log("score" + score);
        if (score >= 3) {
            if (this.isEqualPassword(newPassword, confirmPassword)) {
                return true;
            } else {
                Alert.error('<h4>new and confirm passwords must be equal</h4>');
                return false;
            }
        } else {
            Alert.error('<h4>Password is weak, Please create password as per hint</h4>');
            return false;
        }
    } else {
        Alert.error('<h4>All fields are mandatory</h4>');
        return false;
    }


    }

    isRequired(oldPassword, newPassword, confirmPassword) {
        if (validator.isRequired(oldPassword) && validator.isRequired(newPassword) && validator.isRequired(confirmPassword)) {
            return true;
        }
        return false;
    }

    isEqualPassword(newPassword, confirmPassword){
        if(newPassword==confirmPassword) return true;
        return false;
    }


    handleSubmit(event) {
        event.preventDefault();
        if (this.isValid(this.state.oldPassword, this.state.newPassword, this.state.confirmPassword)) {
            this.props.closeModalChgPass();
        }

    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const id = target.id;
        this.setState({
        [id]: value
        });
    }


    render() {
        return (
        
            <div className="lgn ibox-content">
                
                <form className="form-horizontal">

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Old Password:</label>
                        <div className="col-lg-10">
                            <input
                                type="text"
                                className="form-control"
                                id="oldPassword"
                                value={this.state.oldPassword}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">New Password:</label>
                        <div className="col-lg-10">
                            <input type="text" className="form-control" 
                             id="newPassword"
                             value={this.state.newPassword}
                             onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Confirm Password:</label>
                        <div className="col-lg-10">
                            <input type="password" className="form-control"
                             id="confirmPassword"
                             value={this.state.confirmPassword}
                             onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                    <h4>Password should have at least 7 characters and atleast special characters/digit/upper case </h4>
                    </div>

                    <div id="passwordStrength" className="row">
                    <h4> </h4>
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
                    <button  className=".btn-default"  onClick={this.handleSubmit}>Submit</button>  
                    </div> 
                    </div>                   
                    </div>
                </form>

            </div>
        );
    }
}

export default ChangePassword;