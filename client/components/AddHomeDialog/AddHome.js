import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment'
//src
import AddHomeInner from './AddHomeInner'
import {addHome} from '../../actions/entities/home'
import {getAllAccounts} from '../../actions/entities/account'


const mapStateToProps = (state, ownProps) => {
    const {entities : {accounts : {allAccount}}} = state
    return {allAccount}
}

@connect(mapStateToProps,{addHome,getAllAccounts})


export default class AddHome extends React.Component {
    constructor(props){
        super(props)
        this.state ={
               isSubmit  : false,
            homeName : "",
            homeDesc : "",
            accountIdSelected : "",
         }
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleHomeName = this.handleHomeName.bind(this);
        this.handleHomeDesc = this.handleHomeDesc.bind(this);
        this.handleCancelDialog = this.handleCancelDialog.bind(this);
        this.handleAccountID = this.handleAccountID.bind(this);
    }



    componentDidMount(){
        const  {getAllAccounts} = this.props
        getAllAccounts();
    }


    handleCloseDialog() {
   const {handleCancelDialog,addHome} = this.props
       const {homeName,homeDesc,isSubmit,accountIdSelected} = this.state
       this.setState({isSubmit : true})
       if(homeName != "" && homeDesc != "" && accountIdSelected != "") {
           addHome(homeName,homeDesc,accountIdSelected);
          this.setState({
              homeName : "",
              homeDesc : "",
              accountIdSelected : "",
              isSubmit : false
          })
           handleCancelDialog();
       }
    }

    handleHomeName(event){
        console.log(event.target.value)
        this.setState({homeName : event.target.value})
    }

    handleHomeDesc(event){
        console.log(event.target.value)
        this.setState({homeDesc : event.target.value})
    }

    handleAccountID(event, index, value){
        debugger;
        this.setState({accountIdSelected: value});
    }

    handleCancelDialog(){
        const {handleCancelDialog} = this.props
        const {isSubmit,homeName,homeDesc,accountIdSelected} = this.state
        this.setState({
            homeName : "",
            homeDesc : "",
            accountIdSelected : "",
            isSubmit : false
        })
        handleCancelDialog();
    }



    render(){
         return <AddHomeInner
             {...this.state}
            {...this.props}
             handleCloseDialog = {this.handleCloseDialog}
             handleHomeName = {this.handleHomeName}
             handleHomeDesc = {this.handleHomeDesc}
             handleCancelDialog = {this.handleCancelDialog}
             handleAccountID = {this.handleAccountID}
        />
    }

}
