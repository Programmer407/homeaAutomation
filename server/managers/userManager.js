// libs
import User from '../models/User';
import Role from '../models/Role';
import UserAccountType from '../models/UserAccountType';
import TimeZone from '../models/TimeZone';
/*import Provider from '../models/Provider';
import UserProvider from '../models/UserProvider';
import UserWallet from '../models/UserWallet';
import Transaction from '../models/Transaction';
import sequelize from './../utils/sequelize';
import { NotFoundError } from './../utils/errorUtils'
*/
/*const USER_OBJECTS = [{
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

export const findUserByEmailAndPassword1 = (email:string, password:string):Object =>
  USER_OBJECTS.find(user => user.email === email && user.password === password)
  
export const findUserByID = (id:number):Object =>
  USER_OBJECTS.find(user => user.id === id)
*/
export const findUserByID = (id:number):Object =>
  User.findOne(Object.assign({
    where: {
      id
    },
      include: [Role, UserAccountType, TimeZone]
  }))
  .then(obj => {
    return obj
  })

export const findUserByEmailAndPassword = (email:string, password:string): Promise<any> =>
  User.findOne(Object.assign({
    where: {
      email,
      password
    },
      include: [Role, UserAccountType, TimeZone]
  }))
  .then(obj => {
    return obj
  })

export const isActiveUser = (id:int): Promise<any> =>
  User.findOne(Object.assign({
    where: {
      id,
      status: 1
    }
  }))
  .then(obj => {
    if(obj) {
      return true;
    } else {
      return false;
    }
    //return obj
  })

export const findUserByEmail = (email:string): Promise<any> =>
  User.findOne(Object.assign({
    where: {
      email
    }
  }))
  .then(obj => {
    return obj
  })

export const insertUser = (userObj): Promise<any> =>
  userObj.save()
  .then(obj => {
    return obj
  })
  
export const updateUser = (userObj): Promise<any> =>
  userObj.save()
  .then(obj => {
    return obj
  })

export const findUserByToken = (resetPasswordToken:string): Promise<any> =>
  User.findOne(Object.assign({
    where: {
      resetPasswordToken, 
      resetPasswordExpires: { $gt: Date.now() }
    }
  }))
  .then(obj => {
    return obj
  })

export const findUserByRegistrationToken = (registerToken:string): Promise<any> =>
  User.findOne(Object.assign({
    where: {
      registerToken, 
      registerExpires: { $gt: Date.now() }
    }
  }))
  .then(obj => {
    return obj
  })
