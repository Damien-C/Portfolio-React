import React from 'react';
//Importing modules
import {Paper} from '@material-ui/core'

class CarouselItem extends React.Component{
    render(){
        return (
            
                <img src={this.props.item} />
            
            // <div className='dropdownWrapper'>
            //     <FormControl className={classes.formControl}>
            //         <InputLabel  id='statusLabel' >
            //         </InputLabel>
            //         <Select 
            //         labelId='statusLabel'
            //         name={this.props.id}
            //         value = {this.props.selectedValue} onChange = {this.props.onSelectedValueChange}>
            //         {
            //             this.props.status.map(e => {
            //                 return(
            //                     <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
            //                 )
            //             })
            //         }
            //         </Select>

            //     </FormControl>
                
            // </div>
        );
    }
}

export default CarouselItem;