import React from 'react';
import '../App.css';

class Experiences extends React.Component{
    render(){
        return(
            <div className='frameWrapMain'>
                <div className='contentWrapper'>
                    <div className='experiencesText pageTitle'>
                        I'm a Full Stack Web / Dapp Developer !
                    </div>
                    <div className='leftPannel'>
                        <div className='pannelTitle'>
                            Skills
                        </div>
                        <div className='textContent'>
                            <ul className='textList'>
                                <li> <span>C#, Java, Javascript, Solidity, .NET, Node.js, React.js, JQuery, HTML5, CSS3</span></li>
                                <li> <span>Ethereum, Truffle, Android, .NET, Spring</span> </li>
                                <li> <span>MySQL, MSSQL, Oracle Database</span></li>
                                <li> <span>English and Korean</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className='rightPannel'>
                        <div className='pannelTitle'>
                            Career
                        </div>
                        <div className='textContent'>
                            <ul className='textList'>
                                <li>Wego: Dapp Developer <span>(Feb 2019 - Jun 2020)</span></li>
                                <li>TD Bank: IT Solutions Developer <span>(Jan 2014 - Apr 2016)</span></li>
                                <li>Ahaidea.com: Web Developer <span>(Jan 2013 - Dec 2013)</span></li>
                                <li>Toronto Uhak.com: Web Developer <span>(Jun 2011 – Aug 2011)</span> </li>
                                <li>Humber College: Computer Programmer<span>(Sept 2010 – Jan 2013)</span> </li>
                            </ul>
                        </div>
                    </div>
                    <div className='clear'></div>
                </div>
            </div>
        );
    }
}

export default Experiences;