import React from 'react';
import '../App.css';
import { useSwipeable, Swipeable } from 'react-swipeable';




class Achievements extends React.Component{
    render(){
        
        return(
            <div className='frameWrapMain'>
                <div className='contentWrapper'>
                    <div className='achievementsText pageTitle'>
                    "Genius is one percent inspiration and ninety-nine perspiration."
                    </div>
                    


                </div>



                <div className='photoListWrap'>
                        <div className='photoList'>
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