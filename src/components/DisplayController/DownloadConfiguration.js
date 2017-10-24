import React, {Component} from 'react';
import './DownloadConfiguration.css';
import ProgressBar from '../../shared/ProgressBar';
import Modal from 'react-modal';


const customStyles = {
  
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '24vw',
    background            : '#eee'
  }
};
class DownloadConfiguration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.openModal();
        console.log(this.state);

    }

    openModal() {
        console.log("openModal");
        this.setState({modalIsOpen: true});
        //this.props.closeDownloadConfirmModal();
    }


    closeModal() {
        console.log("closeModal");
        this.setState({modalIsOpen: false});
    }

render() {
    return (
        <div className="ibox-content">
            <form>
                <div className="row1">
                    <span className="row1-txt">
                        Before proceeding with this download, Please insure the following condition are
                        met</span>
                </div>
                <div className="row2">
                    <span>
                        1. You have a Display Config Cable and Adapter Kit (P/N 220-2267) plug into a
                        USB port on your computer</span>
                    <div className="kit">
                        <input type="checkbox"/>
                        <span>Kit Connected</span>
                    </div>
                </div>
                <div className="row2">
                    <span>
                        2. You have prepared the root directory of the connected programming kit by
                        either removing all files or by placing them in subfolders</span>
                    <div className="kit">
                        <input type="checkbox"/>
                        <span>Root Directory Prepared</span>
                    </div>
                </div>
                <br/>

                <div className="row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-3"></div>
                    <div className="lgn-cnl col-lg-3">
                        <div className="col-sm-2">
                            <button className=".btn-default" onClick={this.props.closeDownloadConfirmModal}>Cancel</button>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-2">
                            <button className=".btn-default" onClick={this.handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </form>
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={false}
                style={customStyles}
                contentLabel="">
                <ProgressBar closeModal={this.closeModal}/>
            </Modal>
        </div>
    );
}
}

export default DownloadConfiguration;