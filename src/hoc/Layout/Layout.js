import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Navigation/Header/Header'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from '../../containers/LandingPage/LandingPage'
import Register from '../../containers/Register/Register'
import Activate from '../../containers/Activate/Activate'
import Login from '../../containers/Login/Login'
import Recover from '../../containers/Recover/Recover'
import './Layout.css'
import Logout from '../../components/Logout/Logout'
import PasswordChange from '../../containers/PasswordChangeRecover/PasswordChangeRecover'
import EditInfo from '../../containers/EditInfo/EditInfo'
import AddPackage from '../../components/Package/AddPackage/AddPackage'
import UpdatePackage from '../../components/Package/UpdatePackage/UpdatePackage'
import Searcher from '../../components/Package/Searcher/Searcher'
import RemovePackage from '../../components/Package/RemovePackage/RemovePackage'
import Packages from '../../containers/Packages/Packages'
import PackageRequest from '../../containers/PackageRequest/PackageRequest'
import AddQuotation from '../../components/Quotation/AddQuotation/AddQuotation'
import Quotation from '../../containers/Quotation/Quotation'
import QuotationViewer from '../../components/Quotation/QuotationViewer/QuotationViewer'
import QuotationSearcher from '../../components/Quotation/QuotationSearcher/QuotationSearcher'
import NotAuthorized from '../../containers/NotAuthorized/NotAuthorized'
import UpdateQuotation from '../../components/Quotation/UpdateQuotation/UpdateQuotation'
import Footer from '../../components/Footer/Footer'
import UserSearcher from '../../components/User/UserSearcher/UserSearcher'
import Profile from '../../containers/Profile/Profile'
import BillUploader from '../../components/BillUploader/BillUploader'
import BillSearcher from '../../components/BillSearcher/BillSearcher'
import BillViewer from '../../components/BillsViewer/BillViewer/BillViewer'
import Bill from '../../containers/Bill/Bill'
class Layout extends Component{
    render(){
        return(              
    <div className='Layout'>
        <Router>
        <Header></Header>
        <main className='main'>
        <Switch>
          <Route path="/" exact>
                  <Redirect to='/login'/>
          </Route>
          <Route exact path="/packages">
                  {this.props.isLogged ? (this.props.isAdmin ? <Redirect to='/packages/search'/> : <Packages/> ) : <Redirect to='/login'/>}
          </Route>
          <Route path="/packages/add">
                  {this.props.isLogged ? (this.props.isAdmin ? <AddPackage/> : <NotAuthorized/>) : <Redirect to='/login'/>}
          </Route>
          <Route path="/packages/search">
                  {this.props.isLogged ? <Searcher/> : <Redirect to='/login'/>}       
          </Route>
          <Route path="/packages/update/:idPackage">
                {this.props.isLogged ? (this.props.isAdmin ? <UpdatePackage/> : <NotAuthorized/>) : <Redirect to='/login'/>}
          </Route>
          <Route path="/packages/remove/:idPackage">           
                {this.props.isLogged ? (this.props.isAdmin ? <RemovePackage/> : <NotAuthorized/>) : <Redirect to='/login'/>}
          </Route>
          <Route path="/request">
                  {this.props.isLogged ? <PackageRequest/> : <Redirect to='/login'/>}    
          </Route>
          <Route exact path="/quotation">                  
                  {this.props.isLogged ? (this.props.isAdmin ? <Redirect to='/quotation/search'/> : <Quotation/> ) : <Redirect to='/login'/>}
          </Route>
          <Route path="/quotation/add">
                  {this.props.isLogged ? <AddQuotation/> : <Redirect to='/login'/>}  
          </Route>
          <Route path="/quotation/search">
          {this.props.isLogged ? (this.props.isAdmin ? <QuotationSearcher/> : <NotAuthorized/>) : <Redirect to='/login'/>} 
          </Route>
          <Route path="/quotation/:quotationID">
                  {this.props.isLogged ? (this.props.isAdmin ? <UpdateQuotation/> : <NotAuthorized/>) : <Redirect to='/login'/>}
          </Route>
          <Route exact path='/bill'>
                {this.props.isLogged ? <Bill/> : <Redirect to='/login'/>}  
          </Route>
          <Route path='/bill/upload'>
                {this.props.isLogged ? (this.props.isAdmin ? <BillUploader/> : <NotAuthorized/>) : <Redirect to='/login'/>}
          </Route>
          <Route path='/bill/search'>
                {this.props.isLogged ? (this.props.isAdmin ? <BillSearcher/> : <NotAuthorized/>) : <Redirect to='/login'/>}
          </Route>
          <Route path='/bill/:billID'>
                {this.props.isLogged ? <BillViewer/> : <Redirect to='/login'/>}  
          </Route>
          <Route path='/users/add'>
                  {this.props.isLogged ? <Register/> : <Redirect to='/login'/>} 
          </Route>
          <Route path='/users/search'>
                  {this.props.isLogged ? (this.props.isAdmin ? <UserSearcher/> : <NotAuthorized/>) : <Redirect to='/login'/>}
          </Route>
          <Route path='/users/:userID'>
                 {this.props.isLogged ? <Profile userID={this.props.user.id} isAdmin={this.props.isAdmin}/> : <Redirect to='/login'/>} 
          </Route>
          <Route path="/login">
                <Login/>
          </Route>
          <Route exact path="/register">
                <Register/>
          </Route>  
          <Route path="/logout">
                  {this.props.isLogged ? <Logout/> : <Redirect to='/login'/>} 
          </Route>
          <Route exact path="/recover">
                <Recover/>
          </Route>
          <Route path="/edit">
                  {this.props.isLogged ? <EditInfo/> : <Redirect to='/login'/>}                 
          </Route>
          <Route exact path="/recover/:userID/:code">
                <PasswordChange/>
          </Route>
          <Route path="/register/:userID/:code">
                <Activate/>
          </Route>
          <Route path="/Unauthorized">
                <NotAuthorized/>
          </Route>
        </Switch>
        </main>
        <Footer/>
        </Router>
    </div>
        )
    }
}

const mapStateToProps = state => {
      return{
          user: state.auth.user,
          isLogged: state.auth.isLogged,
          isAdmin: state.auth.isAdmin
      }
}     



export default connect(mapStateToProps,null)(Layout);