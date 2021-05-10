import React, { useState, useEffect }  from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Button from '../../UI/Button/Button'
import Loader from '../../UI/Loader/Loader'
import * as Yup from 'yup'
import { Formik, Form, Field } from "formik";
import '../../../assets/Shared/Forms.css'
import Message from '../../UI/Message/Message'
import UsersViewer from '../UsersViewer/UsersViewer'
import { useMediaQuery } from 'react-responsive'
import ItemsViewerMobile from '../../ItemsViewerMobile/ItemsViewerMobile'

const searchSchema = Yup.object({
    query: Yup.string().required('Info requerida'),
    type: Yup.string().required('Tipo de búsqueda ')
})

const initialValues = {
    query:'',
    type:'id'
}


const UserSearcher = () =>{
    const [users,setUsers] = useState([]) 
    const [status,setStatus] = useState('LOADING')
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const handleSubmit = values =>{
        setStatus('LOADING')
        axios.get(`/users?type=${values.type}&query=${values.query}`)
            .then(res =>  {
                if(res.data.length === 0){
                    setStatus('NO_RESULT')
                }else{  
                    console.log(res.data);
                    setStatus('SUCCESS')
                    setUsers(res.data)
                }   
            })
            .catch(err => {
                setStatus('FAIL')
        })
    }   

    const fetchUsers = () => {
        axios.get(`/users?limit=5`)
            .then(res=>{
                if(Array.isArray(res.data) || res.data.length === 0){
                    setStatus('SUCCESS')
                    setUsers(res.data)
                }else{
                    setStatus('NO_RESULT')
                }
                
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }

    const getAll = () =>{
        axios.get(`/users?limit=all`)
            .then(res=>{
                if(Array.isArray(res.data) || res.data.length === 0){
                    setStatus('SUCCESS')
                    setUsers(res.data)
                }else{
                    setStatus('NO_RESULT')
                }
                
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }

    useEffect(() => {
        fetchUsers();
    },[])

    let searchResult = null
    let form = <Formik
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={(values) =>{
            handleSubmit(values);
        }}
        >
            {({dirty, isValid, values, handleChange}) =>(
            <Form class='form'>
                <h1>Búsqueda de usuarios</h1>
                <Field type='text' placeholder='ID/CustomerID' name='query' className='form-control'></Field>
                <select name='type' onChange={handleChange} value={values.type} className='form-control'>  
                    <option value='id' selected>CustomerID</option>
                    <option value='username'>Username</option>
                    <option value='firstName'>Nombre</option>
                    <option value='lastName'>Apellido</option>
                    <option value='email'>Correo</option>
                </select>
                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Buscar usuario</Button>
                <Button class={'Normal'} type="button" onClick={getAll}>Mostrar Todos</Button>
            </Form>
            )}
        </Formik>

    switch (status){
        case 'LOADING': 
            searchResult = <Loader/>
            break;
        case 'SUCCESS':
            const headers =  {
                'ID': 'id',
                'Nombre' : 'firstName',
                'Apellido' : 'lastName',
                'Usuario' : 'username',
                'Correo' : 'email',
                'Celular' :'phoneNumber'
            } 
            searchResult = isDesktopOrLaptop ? <UsersViewer users={users}/> : <ItemsViewerMobile items={users} reduxItem={'users'} headers={headers} id={'userMobileTable'} details={isAdmin ? true : false}/>
            break;
        case 'NO_RESULT':
            searchResult = <Message class='Error-msg' message='Sin usuarios encontrados'/>
            break;
        case 'FAIL':
            searchResult = <Message class='Error-msg' message='Hubo un error, intente en otro momento'/>
            break;
        default:
            searchResult = <div>Error :'(</div>
    }

    return(
       <div className='searcher'>
           {form}
           {searchResult}
        </div>
        
    )
}

export default UserSearcher;