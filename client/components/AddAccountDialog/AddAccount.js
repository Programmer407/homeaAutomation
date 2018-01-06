import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddAccountInner from './AddAccountInner'
import {accountCreate} from '../../actions/entities/account'


const mapStateToProps = (state, ownProps) => {
    return {}
}

@connect(mapStateToProps,{accountCreate})


export default class AddAccount extends React.Component {
    constructor(props){
        super(props)
        this.state ={
               isSubmit  : false,
            isChecked :false,
        }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
    }



   handleCloseDialog() {
   const {handleCancelDialog,accountCreate} = this.props
       const {isSubmit,isChecked} = this.state
       this.setState({isSubmit : true})
       if(isChecked == true){
      /* accountCreate();*/
           handleCancelDialog();
           this.setState({isSubmit : false,
           isChecked : false
           })
       }

    }

    handleCancelDialog() {
        const {handleCancelDialog} = this.props
        const {isSubmit, isChecked} = this.state
        this.setState({
            isChecked : false,
            isSubmit : false
        })
        handleCancelDialog();
    }

    handleCheckbox(){
        const {isChecked} = this.state
        this.setState({isChecked : !isChecked})
    }



    render(){
         return <AddAccountInner
             {...this.state}
            {...this.props}
             handleCloseDialog = {this.handleCloseDialog}
             handleCheckbox = {this.handleCheckbox}
             handleCancelDialog = {this.handleCancelDialog}
        />
    }

}
