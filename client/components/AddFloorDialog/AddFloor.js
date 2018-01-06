import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddFloorInner from './AddFloorInner'
import {addfloor} from '../../actions/entities/floor'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{addfloor})


export default class AddFloor extends React.Component {
    constructor(props){
        super(props)
        this.state ={
               isSubmit  : false,
            homeId : "",
            floorType : "",
            floorName : "",
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
        this.handleHomeId = this.handleHomeId.bind(this);
        this.handleFloorType = this.handleFloorType.bind(this);
        this.handleFloorName = this.handleFloorName.bind(this);
    }



   handleCloseDialog() {
   const {handleCancelDialog,addfloor} = this.props
       const {isSubmit,homeId,floorType,floorName}   = this.state
       this.setState({isSubmit : true})
       if(homeId != "" && floorType != "" && floorName != "") {
          /* addfloor(floorName,floorType,homeId);*/
       this.setState({
           homeId : "",
           floorType : "",
           floorName : "",
           isSubmit : false
       })
           handleCancelDialog();
       }
    }


    handleHomeId(event, index, value){
        this.setState({homeId: value});
    }


    handleFloorType(event, index, value){
        this.setState({floorType: value});
    }


    handleFloorName(event){
        console.log(event.target.value)
        this.setState({floorName : event.target.value})
    }

    handleCancelDialog(){
        const {handleCancelDialog} = this.props
        const {isSubmit,homeId,floorType,floorName}   = this.state
        this.setState({
            homeId : "",
            floorType : "",
            floorName : "",
            isSubmit : false
        })
        handleCancelDialog()
    }




    render(){
         return <AddFloorInner
             {...this.state}
            {...this.props}
             handleCloseDialog = {this.handleCloseDialog}
             handleCancelDialog = {this.handleCancelDialog}
             handleHomeId = {this.handleHomeId}
             handleFloorType = {this.handleFloorType}
             handleFloorName = {this.handleFloorName}
        />
    }

}
