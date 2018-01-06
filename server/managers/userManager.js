// libs

var models = require('../models');

export const findUserByUsername = (email) =>
    models.user.findOne({where:{user_name:email}}).then(obj => {
            return obj
        });

export const findUserByEmailAndPassword = (email, password) =>
    models.User.findOne(Object.assign({
        where: {
            email,
            password
        },
        include: [models.user_type]
    })).then(obj => {
            return obj
        });

export const findByUsername =function(query_data){

  return models.user.findAll({where:{user_name:query_data.email},include:models.user_type});
}

// export const isActiveUser = (id) =>
//     User.findOne(Object.assign({
//         where: {
//             id,
//             status: 1
//         }
//     }))
//         .then(obj => {
//             if (obj)
//                 return true
//             else
//                 return false
//         })
//
export const findUserByEmail = (email) =>
    models.user.findOne({where:{user_name:email}})
        .then(obj => {
            return obj
        })





export const insertUser = (userObj) =>
  userObj.save()
    .then(obj => {
      return obj
    })

export const updateUser = (userObj) =>
  userObj.save()
    .then(obj => {
      return obj
    })
