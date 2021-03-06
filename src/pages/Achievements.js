import React from 'react';
import '../App.css';
import { Dialog, DialogTitle, DialogContent, Paper } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { withStyles } from '@material-ui/core/styles';
import Api from '../proxyServer';
import CarouselItem from '../components/CarouselItem';


const styles = theme => ({
    popupFrame: {
        alignItems: 'center',
        display: 'flex',
        scrollbarWidth: 'none',
        padding: 0,
        paddingTop: 0,
        'overflow-x': 'scroll',
        'overflow-y': 'hidden', 
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },

    borderRadius: {
        borderRadius: '2px'
    },

    // 'MuiDialogContent-root':{
    //     -msO: 'none', 
    //     scrollbarWidth: 'none', 
    //   },
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
            projectDetail: [],
            dialogDesc: '',
            skills: '', 
            dateStart: '', 
            dateEnd: '', 
            roll: '',
            company: '',
            country: ''
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
                currentScroll: this.state.currentScroll + this.state.currentVH
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
                currentScroll: this.state.currentScroll - this.state.currentVH
            });
        }
        this.carouselScroll.current.scrollTo({left: this.state.currentScroll, behavior: 'smooth'});
    }
    onClickPhoto = (e, n, d, s, ds, de, r, c, co) => {
        this.setState({
            dialogOpen: true,
            dialogId: e,
            dialogTitle: n,
            dialogDesc: d,
            skills: s,
            dateStart: ds,
            dateEnd: de,
            roll: r,
            company: c,
            country: co
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
                <Dialog className={classes.borderRadius} open={this.state.dialogOpen} onClose={this.handleDialogClose} fullWidth={true} fullScreen={true} maxWidth='lg'>
                    {/* <DialogTitle>{this.state.dialogTitle}</DialogTitle> */}
                        <DialogContent ref={this.carouselScroll} className={classes.popupFrame} >
                            <div className='buttonClose' onClick={this.handleDialogClose}>X</div>
                            <div className='carouselLeftButton' onClick={this.onCarouselLeftButtonClick}> { '<' } </div>
                            <div className='carouselRightButton' onClick={this.onCarouselRightButtonClick}> { '>' } </div>
                            <div className='carousel'>
                                    {
                                        this.state.projectDetail.map(e => {
                                            return(
                                                // <div className='canvas'>
                                                    <div  key={e.id} className='imageWrap'>
                                                        <img src={require('../images/src/'+e.fileName)} />
                                                    </div>
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
                            <div className='subtitle'>
                                <div className='contextTitle'>{this.state.dialogTitle}</div>
                                <ul className='contextList'>
                                    <li>{this.state.company}, {this.state.country}</li>
                                    <li>기간 :  {this.state.dateStart} - {this.state.dateEnd}</li>
                                    <li>역할 :  {this.state.roll}</li>
                                    <li>사용기술 :  {this.state.skills}</li>
                                    <li>설명 :  {this.state.dialogDesc}</li>
                                </ul>
                            </div>
                            
                        </DialogContent>
                </Dialog>

                {/* Main */}
                <div className='contentWrapper'>
                    <div className='achievementsText pageTitle'>
                        We don't make mistakes, just happy little accidents. Programming should be fun.
                    </div>
                </div>
                <div ref={this.scrollable} className='photoListWrap'>
                    <div className='leftButton' onClick={this.onLeftButtonClick}> { '<' } </div>
                    <div className='rightButton' onClick={this.onRightButtonClick}> { '>' } </div>
                    <div className='photoList'>

                        {
                            this.state.projectList.map(e => {
                                return(
                                    <div ref={this.photoItem} key={e.id} className='photoItem' onClick={() => this.onClickPhoto(e.id, e.name, e.desc, e.skills, e.dateStart, e.dateEnd, e.roll, e.company, e.country)}>
                                        <div className='photo'>
                                            <img src={require('../images/src/'+e.fileName)} />
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