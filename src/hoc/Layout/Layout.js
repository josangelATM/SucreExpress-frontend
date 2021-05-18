import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Navigation/Header/Header'
import browserHistory from "history/createBrowserHistory";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from '../../containers/LandingPage/LandingPage'
import MediaQuery from 'react-responsive'
import Register from '../../containers/Register/Register'
import Activate from '../../containers/Activate/Activate'
import Login from '../../containers/Login/Login'
import Recover from '../../containers/Recover/Recover'
import DesignedBy from '../../components/DesignedBy/DesignedBy'
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
import QuotationSearcher from '../../components/Quotation/QuotationSearcher/QuotationSearcher'
import NotAuthorized from '../../containers/NotAuthorized/NotAuthorized'
import UpdateQuotation from '../../components/Quotation/UpdateQuotation/UpdateQuotation'
import Footer from '../../components/Footer/Footer'
import UserSearcher from '../../components/User/UserSearcher/UserSearcher'
import Profile from '../../containers/Profile/Profile'
import BillUploader from '../../components/BillUploader/BillUploader'
import BillSearcher from '../../components/BillSearcher/BillSearcher'
import BillGenerator from '../../components/BillGenerator/BillGenerator'
import Bill from '../../containers/Bill/Bill'
import ReferralsPackages from '../../components/Package/ReferralsPackages/ReferralsPackages';
import NotFound from '../../components/NotFound/NotFound';
import BillViewer from '../../components/BillsViewer/BillViewer/BillViewer';
class Layout extends Component{
    render(){
        return(              
    <div className='Layout'>
        <Router history={browserHistory}>
        <Header></Header>
        <main className='main'>
        <Switch>
          <Route path="/" exact>
                  <Redirect to='/home'/>
          </Route>
          <Route path="/home" exact>
                  <LandingPage/>
          </Route>
          <Route exact path="/packages">
                  {this.props.isLogged ? (this.props.isAdmin ? <Redirect to='/packages/search'/> : <Packages/> ) : <Redirect to='/login'/>}
          </Route>
          <Route path="/packages/add">
                  {this.props.isLogged ? (this.props.isAdmin ? <AddPackage/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}
          </Route>
          <Route path="/packages/search">
                  {this.props.isLogged ? <Searcher/> : <Redirect to='/login'/>}       
          </Route>
          <Route path="/packages/referrals">
                  {this.props.isLogged ? (this.props.user.hasReferrals ? <ReferralsPackages/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}       
          </Route>
          <Route path="/packages/:idPackage">
                {this.props.isLogged ? (this.props.isAdmin ? <UpdatePackage/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}
          </Route>
          <Route path="/packages/remove/:idPackage">           
                {this.props.isLogged ? (this.props.isAdmin ? <RemovePackage/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}
          </Route>
          <Route path="/requests">
                  {this.props.isLogged ? <PackageRequest/> : <Redirect to='/login'/>}    
          </Route>
          <Route exact path="/quotations">                  
                  {this.props.isLogged ? (this.props.isAdmin ? <Redirect to='/quotations/search'/> : <Quotation/> ) : <Redirect to='/login'/>}
          </Route>
          <Route path="/quotations/add">
                  {this.props.isLogged ? <AddQuotation/> : <Redirect to='/login'/>}  
          </Route>
          <Route path="/quotations/search">
          {this.props.isLogged ? (this.props.isAdmin ? <QuotationSearcher/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>} 
          </Route>
          <Route path="/quotations/:quotationID">
                  {this.props.isLogged ? (this.props.isAdmin ? <UpdateQuotation/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}
          </Route>
          <Route exact path='/bills'>
                {this.props.isLogged ? (this.props.isAdmin ? <Redirect to='/bills/search'/> : <Bill/> )  : <Redirect to='/login'/>}  
          </Route>
          <Route path='/bills/upload'>
                {this.props.isLogged ? (this.props.isAdmin ? <BillUploader/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}
          </Route>
          <Route path='/bills/search'>
                {this.props.isLogged ? (this.props.isAdmin ? <BillSearcher/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}
          </Route>
          <Route path='/bills/generator'>
                {this.props.isLogged ? (this.props.isAdmin ? <BillGenerator/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}  
          </Route>
          <Route path='/bills/:billID'>
                {this.props.isLogged ? (this.props.isAdmin ? <BillViewer/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}  
          </Route>       
          <Route exact path='/users'>
                  {this.props.isLogged ? (this.props.isAdmin ? <Redirect to='/users/search'/> : <Redirect to='/unauthorized'/> ) : <Redirect to='/login'/>} 
          </Route> 
          <Route path='/users/add'>
                  {this.props.isLogged ? <Register/> : <Redirect to='/login'/>} 
          </Route>
          <Route path='/users/search'>
                  {this.props.isLogged ? (this.props.isAdmin ? <UserSearcher/> : <Redirect to='/unauthorized'/>) : <Redirect to='/login'/>}
          </Route>
          <Route path='/users/:userID'>
                 {this.props.isLogged ? <Profile userID={this.props.user.id} isAdmin={this.props.isAdmin}/> : <Redirect to='/login'/>} 
          </Route>
          
          <Route path="/login">
                  {this.props.isLogged ? <Redirect to='/home'/> : <Login/>} 
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
          <Route path="/unauthorized">
                <NotAuthorized/>
          </Route>
          <Route>
                <NotFound/>
          </Route>
        </Switch>
        </main>
        <MediaQuery minDeviceWidth={1224}>
                <Footer/>
        </MediaQuery>
        <DesignedBy/>
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