import React from 'react';
import '../App.css';
import { useSwipeable, Swipeable } from 'react-swipeable';
import SwipeableViews from 'react-swipeable-views';




class Achievements extends React.Component{
    constructor(){
        super(...arguments)
        this.scrollable = React.createRef();
        // this.onRightButtonClick = this.onRightButtonClick.bind(this);
        this.state = {
            currentScroll: 0,
            scrollWidth: 0,
            currentVH: 0
        };
    }
    componentDidMount() {
        this.setState({
            scrollWidth: this.scrollable.current.scrollWidth,
            currentVH: window.innerWidth,
        })
    }
    onRightButtonClick = async() => {
        if((this.state.currentScroll+this.state.currentVH) >= this.state.scrollWidth ){
            await this.setState({
                currentScroll: this.state.scrollWidth - this.state.currentVH
            });
        }
        else{
            await this.setState({
                currentScroll: this.state.currentScroll + this.state.currentVH
            });
        }
        await this.scrollable.current.scrollTo({left: this.state.currentScroll, behavior: 'smooth'});
        await console.log(this.state.currentScroll);
        await console.log(this.state.scrollWidth);
    }
    onLeftButtonClick = async() => {
        if((this.state.currentScroll-this.state.currentVH) <= 0 ){
            await this.setState({
                currentScroll: 0
            });
        }
        else{
            await this.setState({
                currentScroll: this.state.currentScroll - this.state.currentVH
            });
        }
        await this.scrollable.current.scrollTo({left: this.state.currentScroll, behavior: 'smooth'});
        await console.log(this.state.currentScroll);
    }
    render(){
        
        return(
            <div className='frameWrapMain'>
                <div className='contentWrapper'>
                    <div className='achievementsText pageTitle'>
                    "Genius is one percent inspiration and ninety-nine perspiration."
                    </div>
                </div>
                <div ref={this.scrollable} className='photoListWrap'>
                    <div className='leftButton' onClick={this.onLeftButtonClick}> { '<' } </div>
                    <div className='rightButton' onClick={this.onRightButtonClick}> { '>' } </div>
                    <div className='photoList'>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div  className='photoDesc'>
                                project
                            </div>
                        </div>

                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>

                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>

                        <div className='photoItem'>
                            <div className='photo'>

                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>

                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>

                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                        <div className='photoItem'>
                            <div className='photo'>
                            
                            </div>
                            <div className='photoDesc'>
                                project
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
        );
    }
}

export default Achievements;