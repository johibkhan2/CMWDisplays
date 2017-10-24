import React, {Component} from 'react';
import './PopUp.css';
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            corporateUser: 'C',
            dealerUser:'D',
            userType:'',
            userName:'',
            dealerId:'',
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

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        this.props.closeModal();
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
                            <input type="radio" id="userType" name="userType"  onChange={this.handleChangeUserType} value={this.state.corporateUser}/>
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
                             id="dealerId" 
                            value={this.state.dealerId}
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