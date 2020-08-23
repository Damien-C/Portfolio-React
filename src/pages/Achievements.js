import React from 'react';
import '../App.css';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Api from '../proxyServer';
import Config from '../config.json';

class Achievements extends React.Component{
    constructor(){
        super(...arguments)
        this.scrollable = React.createRef();
        this.photoItem = React.createRef();
        this.state = {
            currentScroll: 0,
            scrollTotal: 0,
            currentVH: 0,
            dialogOpen: false,
            dialogId: 0,
            projectList: [],
            photoItemWidth: 0,
        };
    }
    componentDidMount() {
        console.log(this.scrollable.current.scrollWidth);
        console.log(this.photoItem);
        this.setState({
            scrollTotal: this.scrollable.current.scrollWidth,
            currentVH: window.innerWidth,
        })
        fetch(Api.getApiServer()+'/api/projectList',{
            method: 'get',
            dataType: 'json',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({projectList: responseData});
        })
        .catch((error)=>{
            console.log('Error fetching project list',error);
        });
    }
    onRightButtonClick = async () => {
        //Reset the scroll & screen size again because of a bug that cannot read total scroll size
        await this.setState({
            scrollTotal: this.scrollable.current.scrollWidth,
            currentVH: window.innerWidth,
            currentScroll: this.scrollable.current.scrollLeft,
            photoItemWidth: this.photoItem.current.scrollWidth,
        });
        //Check if the value is higher than the total scroll size
        if((this.state.currentScroll+this.state.currentVH) >= this.state.scrollTotal ){
             this.setState({
                //Subscract current view width because scroll begins from left
                currentScroll: this.state.scrollTotal - this.state.currentVH
            });
        }
        else{
             this.setState({
                // subtract half of photo item size since in some screen size images always appear half
                currentScroll: this.state.currentScroll + this.state.currentVH - (this.state.photoItemWidth) 
            });
        }
        this.scrollable.current.scrollTo({left: this.state.currentScroll, behavior: 'smooth'});
    }
    onLeftButtonClick = async () => {
        //Reset the scroll & screen size again because of a bug that cannot read total scroll size
        await this.setState({
            scrollTotal: this.scrollable.current.scrollWidth,
            currentVH: window.innerWidth,
            currentScroll: this.scrollable.current.scrollLeft,
            photoItemWidth: this.photoItem.current.scrollWidth,
        });
        //Check if the value is lower than the 0
        if((this.state.currentScroll-this.state.currentVH) <= 0 ){
            this.setState({
                currentScroll: 0
            });
        }
        else{
            this.setState({
                // subtract half of photo item size since in some screen size images always appear half
                currentScroll: this.state.currentScroll - this.state.currentVH + (this.state.photoItemWidth)
            });
        }
        this.scrollable.current.scrollTo({left: this.state.currentScroll, behavior: 'smooth'});
    }
    onClickPhoto = (e) => {
        this.setState({
            dialogOpen: true,
            dialogId: e
        })
    }
    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }
    render(){
        
        return(
            <div className='frameWrapMain'>

                {/* Dialog */}
                <Dialog open={this.state.dialogOpen} close={this.handleDialogClose} fullWidth={true} maxWidth='lg'>
                    <DialogTitle>{this.state.dialogId}</DialogTitle>
                        <DialogContent>
                            <div className=''>
                                
                            </div>
                            <div className=''>
                                <button onClick={this.handleDialogClose}>확인</button>
                            </div>
                            
                        </DialogContent>
                </Dialog>

                {/* Main */}
                <div className='contentWrapper'>
                    <div className='achievementsText pageTitle'>
                    "Genius is one percent inspiration and ninety-nine perspiration."
                    </div>
                </div>
                <div ref={this.scrollable} className='photoListWrap'>
                    <div className='leftButton' onClick={this.onLeftButtonClick}> { '<' } </div>
                    <div className='rightButton' onClick={this.onRightButtonClick}> { '>' } </div>
                    <div className='photoList'>

                        {
                            this.state.projectList.map(e => {
                                return(
                                    <div ref={this.photoItem} key={e.name} className='photoItem' onClick={() => this.onClickPhoto(e.name)}>
                                        <div className='photo'>
                                            <img src={Api.getApiServer()+'/'+ e.fileName} />
                                        </div>
                                        <div  className='photoDesc'>
                                            <div>
                                                {e.name}
                                            </div>
                                            <div>
                                                <p>{e.dateStart} - {e.dateEnd}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>

            </div>
            
        );
    }
}

export default Achievements;