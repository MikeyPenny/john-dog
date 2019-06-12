import React, { Component } from 'react';
import QRCode from 'qrcode.react';

class QrWrap extends Component {
    render() {
        return (
            <div>
                <QRCode  ref={this.qrRef} id="qrCode" 
                    value={`${process.env.REACT_APP_BACK_END_BASE_URL}/PetFound/found/${this.props.petId}`} 
                />     
            </div>
        );
    }
}

export default QrWrap;
