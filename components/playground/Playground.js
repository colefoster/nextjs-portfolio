import React, { useState } from 'react';

const { default: DropdownRadio } = require("./DropdownRadio");
import ChatWindow from './ChatWindow';


function Playground() {

    return (
        <>
            <DropdownRadio />


            <ChatWindow />
        </>
        
    );
}

export default Playground;