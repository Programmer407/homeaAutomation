/* @flow */
import User from '../models/User';

const USER_OBJECTS = [{
    id: 1,
    email: 'sauron@fusionops.com',
    password: '123456',
    firstName: 'Sauron',
    lastName: '',
    linkHome: '/system'
  }, {
    id: 2,
    email: 'reports@aeraops.com',
    password: '#Aera101',
    firstName: 'Aeraops',
    lastName: '',
    linkHome: '/reports'
  }]  

export const getUser = () => USER_OBJECTS[0]

export const findUserByEmailAndPassword = (email:string, password:string):Object =>
  USER_OBJECTS.find(user => user.email === email && user.password === password)

export const findUserByID = (id:number):Object =>
  USER_OBJECTS.find(user => user.id === id)
