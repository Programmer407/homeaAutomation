import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddPalaceInner from './AddPalaceInner'
import {addPalace} from '../../actions/entities/palace'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{addPalace})


export default class AddPalace extends React.Component {
    constructor(props){
        super(props)
        this.state ={
               isSubmit  : false,
            selectedHomeName : "",
            selectedFloorName : "",
            selectedPalaceType : "",
            palaceName : ""
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleHomeName = this.handleHomeName.bind(this);
        this.handleFloorName = this.handleFloorName.bind(this);
        this.handlePalaceType = this.handlePalaceType.bind(this);
        this.handlePalaceName = this.handlePalaceName.bind(this);
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
    }



   handleCloseDialog() {
   const {handleCancelDialog,addPalace} = this.props
       const {selectedHomeName,selectedFloorName,selectedPalaceType,palaceName,isSubmit} = this.state
       this.setState({isSubmit : true})
       if(selectedHomeName != "" && selectedFloorName != "" && selectedPalaceType != "" && palaceName != "") {
          /* addPalace(selectedHomeName,selectedFloorName,selectedPalaceType,palaceName);*/
           handleCancelDialog();
           this.setState({
               isSubmit : false,
               selectedHomeName : "",
               selectedFloorName : "",
               selectedPalaceType : "",
               palaceName : ""
           })
       }
    }


    handleHomeName(event, index, value){
        this.setState({selectedHomeName: value});
    }


    handleFloorName(event, index, value){
        this.setState({selectedFloorName: value});
    }

    handlePalaceType(event, index, value){
        this.setState({selectedPalaceType: value});
    }

    handlePalaceName(event){
        console.log(event.target.value)
        this.setState({palaceName : event.target.value})
    }

    handleCancelDialog(){
        const {handleCancelDialog} = this.props
        this.setState({
            isSubmit : false,
            selectedHomeName : "",
            selectedFloorName : "",
            selectedPalaceType : "",
            palaceName : ""
        })
        handleCancelDialog();
    }


    render(){
         return <AddPalaceInner
             {...this.state}
            {...this.props}
             handleCloseDialog = {this.handleCloseDialog}
             handleHomeName = {this.handleHomeName}
             handleFloorName = {this.handleFloorName}
             handlePalaceType = {this.handlePalaceType}
             handlePalaceName  = {this.handlePalaceName}
        />
    }

}
