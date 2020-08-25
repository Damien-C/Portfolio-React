import React from 'react';
import '../App.css';

class Contact extends React.Component{
    render(){
        return(
            <div className='frameWrapMain'>
                <div className='contactText'>
                    "A man has as many social selves as there are individuals who recognize him."
                </div>
                <ul className='contactInfo'>
                    <li>cmshkn@gmail.com</li>
                    <li>010-3457-0578</li>
                    <li>Minseok Choi / Damien</li>
                </ul>
            </div>
        );
    }
}

export default Contact;