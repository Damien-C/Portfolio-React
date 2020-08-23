import React from 'react';
import '../App.css';
import { Dialog, DialogTitle, DialogContent, Paper } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { withStyles } from '@material-ui/core/styles';
import Api from '../proxyServer';
import CarouselItem from '../components/CarouselItem';

const styles = theme => ({
    popupFrame: {
        backgroundColor: '#353535',
        alignItems: 'center',
        display: 'flex',
        paddingBottom: '20px'
    },
    borderRadius: {
        borderRadius: '2px'
    }
    // arrowIcon: {
    //     width: '20px'
    // }
});

class Achievements extends React.Component{
    constructor(){
        super(...arguments)
        this.scrollable = React.createRef();
        this.photoItem = React.createRef();
        this.carouselScroll = React.createRef();
        this.state = {
            currentScroll: 0,
            scrollTotal: 0,
            currentVH: 0,
            dialogOpen: false,
            dialogId: 0,
            dialogTitle: '',
            projectList: [],
            photoItemWidth: 0,
            projectDetail: []
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
    onCarouselRightButtonClick = async () => {
        //Reset the scroll & screen size again because of a bug that cannot read total scroll size
        await this.setState({
            scrollTotal: this.carouselScroll.current.scrollWidth,
            currentVH: window.innerWidth,
            currentScroll: this.carouselScroll.current.scrollLeft,
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
        this.carouselScroll.current.scrollTo({left: this.state.currentScroll, behavior: 'smooth'});
    }
    onCarouselLeftButtonClick = async () => {
        //Reset the scroll & screen size again because of a bug that cannot read total scroll size
        await this.setState({
            scrollTotal: this.carouselScroll.current.scrollWidth,
            currentVH: window.innerWidth,
            currentScroll: this.carouselScroll.current.scrollLeft,
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
        this.carouselScroll.current.scrollTo({left: this.state.currentScroll, behavior: 'smooth'});
    }
    onClickPhoto = (e, n) => {
        this.setState({
            dialogOpen: true,
            dialogId: e,
            dialogTitle: n
        })

        fetch(Api.getApiServer()+'/api/projectDetail?id='+e,{
            method: 'get',
            dataType: 'json',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({projectDetail: responseData});
        })
        .catch((error)=>{
            console.log('Error fetching project list',error);
        });


    }
    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }
    render(){
        const { classes } = this.props;
        return(
            <div className='frameWrapMain'>

                {/* Dialog */}
                <Dialog className={classes.borderRadius} open={this.state.dialogOpen} onClose={this.handleDialogClose} fullWidth={true} maxWidth='lg'>
                    {/* <DialogTitle>{this.state.dialogTitle}</DialogTitle> */}
                        <DialogContent ref={this.carouselScroll} className={classes.popupFrame} >
                            <div className='carouselLeftButton' onClick={this.onCarouselLeftButtonClick}> { '<' } </div>
                            <div className='carouselRightButton' onClick={this.onCarouselRightButtonClick}> { '>' } </div>
                            <div className='carousel'>
                                    {
                                        this.state.projectDetail.map(e => {
                                            return(
                                                // <div className='canvas'>
                                                    <img key={e.id} src={Api.getApiServer()+'/'+e.fileName} />
                                                // </div>
                                            )
                                        })
                                    }

                                    {/* <Carousel autoPlay={false} animation={"slide"}>
                                        {
                                            this.state.projectDetail.map(e => {
                                                return(
                                                    <CarouselItem key={e.id} item={Api.getApiServer()+'/'+e.fileName} />
                                                )
                                            })
                                        }
                                    </Carousel> */}
                                    {/* this.state.projectDetail.map(e => {
                                         return(
                                           <div>
                                                <img src={Api.getApiServer()+'/'+e.fileName} />
                                             </div>
                                         )
                                     }) */}
                                
                            </div>
                            {/* <div className=''>
                                <button onClick={this.handleDialogClose}>확인</button>
                            </div> */}
                            
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
                                    <div ref={this.photoItem} key={e.id} className='photoItem' onClick={() => this.onClickPhoto(e.id, e.name)}>
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

export default withStyles(styles)(Achievements);