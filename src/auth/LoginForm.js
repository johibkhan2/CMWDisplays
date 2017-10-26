import React, {Component} from 'react';
import './LoginForm.css';
import * as authService from '../services/authService';
import Alert from 'react-s-alert';
import * as validator from '../validation/validator';
import { browserHistory } from 'react-router';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            corporateUser: 'C',
            dealerUser:'D',
            userType:'C',
            userName:'',
            DealerId:'',
            password:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUserType = this.handleChangeUserType.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        //const value = target.type === 'radio' ? target.checked : target.value;
        if(target.type !== 'radio'){
        const value = target.value;
        const id = target.id;
        this.setState({
        [id]: value
        });
        }
    }

    IsValid(userName, password, DealerId) {
        if (validator.isRequired(userName) && validator.isRequired(password) && validator.isRequired(DealerId)) {
            return true;
        }
        return false;
    }


    handleSubmit(event) {
        event.preventDefault();
        if(this.IsValid(this.state.userName,this.state.password,this.state.DealerId)){ 
        this.props.closeModal();
        // authService.authenticateUser(this.state.userName,this.state.password,this.state.DealerId,this.state.userType).then(res => {
        //     console.log(res);
        //     //this.setState({data: res})
        // })
        // .catch(function (error) {
        //     /*      // console.log(error);*/
        //     if (error.response) {
        //         // The request was made, but the server responded with a status code that falls
        //         // out of the range of 2xx
        //         console.log(error.response.data);
        //         console.log(error.response.status);
        //         console.log(error.response.headers);
        //     } else {
        //         // Something happened in setting up the request that triggered an Error
        //         console.log('Error', error.message);
        //     }
        //     console.log(error.config);
        //     return error;
        // });
        localStorage.setItem('isLoggedIn', true);
        window.location.href='./displayController';
        }else{
            Alert.error('<h4>All fields are mandatory</h4>');
        }
    }

    handleChangeUserType(event){
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
                
                <form className="form-horizontal" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label className="col-lg-2 control-label"></label>
                        <div className="col-lg-10" >
                            <input type="radio" id="userType" name="userType"  onChange={this.handleChangeUserType} value={this.state.corporateUser} defaultChecked={true}/>
                            <span className="txt-clr"> Corporate User&nbsp;&nbsp;&nbsp;
                            </span>
                            <input type="radio" id="userType" name="userType"   onChange={this.handleChangeUserType} value={this.state.dealerUser}/>
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
                                onChange={this.handleChange}
                                id="userName"
                                value={this.state.userName}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Dealer&nbsp;Id:</label>
                        <div className="col-lg-10">
                            <input type="text" className="form-control" 
                            onChange={this.handleChange}
                             id="DealerId" 
                            value={this.state.DealerId}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="txt-clr col-lg-2 control-label">Password:</label>
                        <div className="col-lg-10">
                            <input type="password" className="form-control"
                            onChange={this.handleChange} 
                            value={this.state.password}
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