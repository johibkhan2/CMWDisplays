import React, {Component} from 'react';
import './DownloadConfiguration.css';
import ProgressBar from './ProgressBar';
import Modal from 'react-modal';
import Alert from 'react-s-alert';
import * as displayControllerService from '../../services/displayControllerService';
import  {resetTimeoutNow} from '../../constants/timer';
import {saveByteArray} from './saveFile';

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
//this is the download configuration component
class DownloadConfiguration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             modalIsOpen: false,
             isKitConnected: false,
             isPrepared:false,
             percent:10,
             color:'#D3D3D3'
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.changeState = this.changeState.bind(this);
    }


    // it is called when download configuration pop up is submitted
    handleSubmit(event) {
    event.preventDefault();
    //making sure both the checkboxes are checked
    if (this.state.isKitConnected && this.state.isPrepared) {
        //making api call to download file from system
        displayControllerService.downloadFileFromSystem()
            .then(response => {
                resetTimeoutNow();
                this.downloadFile(response);
                //this.props.closeDownloadConfirmModal();
            });
            //opening downloading progress bar
        this.openModal();
    } else {
        Alert.error("<h4>Please check both the checkboxs</h4>");
    }
    }

   //read file chunk by chunk using javascript

    downloadFile(response){
    // response.body is a readable stream.
    // Calling getReader() gives us exclusive access to
    // the stream's content
    var reader = response.body.getReader();
    var bytesReceived = 0;

    //     var arrayBuffer = this.result,
    //   array = new Uint8Array(arrayBuffer);

    // read() returns a promise that resolves
    // when a value has been received
    return reader.read().then(function processResult(result) {
        // Result objects contain two properties:
        // done  - true if the stream has already given
        //         you all its data.
        // value - some data. Always undefined when
        //         done is true.
        if (result.done) {
        console.log("Fetch completed"+result.value);
        //this.changeState(100,'lightgreen');
        return;
        }

        // result.value for fetch streams is a Uint8Array
        bytesReceived += result.value.length;
        this.changeState(50,'#FF6600');
        console.log('Received', bytesReceived, 'bytes of data so far');
        // Read some more, and call this function again
        return reader.read().then(processResult);
        }.bind(this))
        .then(function(result) {
            saveByteArray(result,'example.doc');
          })
          .catch(function(err) {
            console.log("err", err)
          });

        }

    

    //changing % and color of loader

    changeState(percent, color) {
            this.setState({percent: percent, color: color});
    } 

    openModal() {
        console.log("openModal");
        this.setState({modalIsOpen: true});
        //this.props.closeDownloadConfirmModal();
    }

//cancelling the downloading progress bar 
    closeModal() {
        console.log("closeModal");
        this.setState({modalIsOpen: false});
        //cancelling download
        if (window.stop !== undefined) {
            window.stop();
        } else if (document.execCommand !== undefined) {
            document.execCommand("Stop", false);
        }
    }

    //setting the values for checkboxs
    handleCheckBoxChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox'? target.checked: target.value;
        const name = target.name;
        this.setState({[name]: value});
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
                            <input name="isKitConnected" type="checkbox" onChange={this.handleCheckBoxChange}/>
                            <span>Kit Connected</span>
                        </div>
                    </div>
                    <div className="row2">
                        <span>
                            2. You have prepared the root directory of the connected programming kit by
                            either removing all files or by placing them in subfolders</span>
                        <div className="kit">
                            <input name="isPrepared" type="checkbox" onChange={this.handleCheckBoxChange}/>
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
                {/**
                https://github.com/reactjs/react-modal
                */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={false}
                    overlayClassName="ModalOverlayClass"
                    style={customStyles}
                    contentLabel="">
                    <ProgressBar closeModal={this.closeModal} percent={this.state.percent} color={this.state.color}/>
                </Modal>
            </div>
        );
    }
    }

export default DownloadConfiguration;