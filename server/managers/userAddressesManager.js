// libs
import User from '../models/User';
import UserAddresses from '../models/UserAddresses';

export const findAllUserAddresses = (id:number):Object =>
  UserAddresses.findAll(Object.assign({
    include: [{
        model: User,
        where: { id }
    }]
  }))
  .then(obj => {
    return obj
  })