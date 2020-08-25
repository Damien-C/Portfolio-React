import React from 'react';
//Importing modules
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component{
    render(){
        return(
            <div className='navigationWrap'>
                <ul>
                    <li><NavLink activeClassName='activeLink' to='/Main'>Intro</NavLink></li>
                    <li><NavLink activeClassName='activeLink' to='/Experiences'>Experiences</NavLink></li>
                    <li><NavLink activeClassName='activeLink' to='/Achievements'>Achievements</NavLink></li>
                    <li><NavLink activeClassName='activeLink' to='/Contact'>Contact</NavLink> </li>
                </ul>
                <div className='clear'></div>
            </div>
        );
    }
}

export default Navigation;