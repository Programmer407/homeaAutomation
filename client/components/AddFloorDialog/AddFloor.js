import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddFloorInner from './AddFloorInner'
import {addAppliance} from '../../actions/entities/appliance'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{addAppliance})


export default class AddFloor extends React.Component {
    constructor(props){
        super(props)
        this.state ={
               isSubmit  : false,
            applianceName : "",
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }



   handleCloseDialog() {
   const {handleCancelDialog} = this.props
       this.setState({isSubmit : true})
       handleCancelDialog();
    }




    render(){
         return <AddFloorInner
             {...this.state}
            {...this.props}
             handleCloseDialog = {this.handleCloseDialog}
        />
    }

}
