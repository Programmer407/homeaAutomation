/* @flow */
import User from '../models/User';
import Role from '../models/Role';
import UserAccountType from '../models/UserAccountType';
import TimeZone from '../models/TimeZone';
import Provider from '../models/Provider';
import UserProvider from '../models/UserProvider';
import UserWallet from '../models/UserWallet';
import Transaction from '../models/Transaction';
import sequelize from './../utils/sequelize';
import { NotFoundError } from './../utils/errorUtils'
import buildEntityManagerFunctions from "./../utils/buildEntityManagerFunctions"

export const {
  findByID,
  findAll,
  updateByID,
  create,
  deleteByID
} = buildEntityManagerFunctions(User)

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

export const findUserByEmailAndPassword1 = (email:string, password:string):Object =>
  USER_OBJECTS.find(user => user.email === email && user.password === password)
  
export const findUserByID = (id:number):Object =>
  USER_OBJECTS.find(user => user.id === id)

export const findUserByEmailAndPassword = (email:string, password:string): Promise<any> =>
  User.findOne(Object.assign({
    where: {
      email,
      password
    },
      include: [Role, UserAccountType, TimeZone]
  }))
  .then(item => {
    if (!item) {
      throw new NotFoundError(`Couldn't find an object with email ${email}`)
    }
    //console.log(item.dataValues)
    return item
  })

