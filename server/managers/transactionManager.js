import Sequelize from "sequelize"

// src
import Transaction from '../models/Transaction'
import User from '../models/User'
import TransactionType from '../models/TransactionType'
import AssociatedAddress from '../models/AssociatedAddress'
import UserAddress from '../models/UserAddress'
import UserWallet from '../models/UserWallet'
import TransactionImportType from '../models/TransactionImportType'

export const findTransactionsByUserId = (id, typeName):Object =>
  Transaction.findAll(Object.assign({
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsByUserId1 = (id, typeName, orderBy, orderWay):Object =>
  Transaction.findAll(Object.assign({
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ],
    order: Sequelize.literal(orderBy + ' ' + orderWay)
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchText = (id, typeName, searchParam):Object =>
  Transaction.findAll(Object.assign({
    where: {
      $or: [
        { destination: { $like: '%' + searchParam + '%' } },
        { note: { $like: '%' + searchParam + '%' } },
        { amount: { $like: '%' + searchParam + '%' } },
        { asset: { $like: '%' + searchParam + '%' } },
        { value: { $like: '%' + searchParam + '%' } },
        Sequelize.literal("associatedaddress.nick_name like '%" + searchParam + "%'"),
        Sequelize.literal("useraddress.nick_name like '%" + searchParam + "%'"),
        Sequelize.literal("userwallet.wallet_name like '%" + searchParam + "%'")
      ]
    },
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchTextDate = (id, typeName, searchParam, startDate, endDate):Object =>
  Transaction.findAll(Object.assign({
    where: {
      $and: [
        {transactionDate: {$between: [startDate, endDate]}},
        {$or: [
          { destination: { $like: '%' + searchParam + '%' } },
          { note: { $like: '%' + searchParam + '%' } },
          { amount: { $like: '%' + searchParam + '%' } },
          { asset: { $like: '%' + searchParam + '%' } },
          { value: { $like: '%' + searchParam + '%' } },
          Sequelize.literal("associatedaddress.nick_name like '%" + searchParam + "%'"),
          Sequelize.literal("useraddress.nick_name like '%" + searchParam + "%'"),
          Sequelize.literal("userwallet.wallet_name like '%" + searchParam + "%'")
        ]}
      ]
    },
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchTextStartDate = (id, typeName, searchParam, startDate):Object =>
  Transaction.findAll(Object.assign({
    where: {
      $and: [
        {transactionDate: {$gte: [startDate]}},
        {$or: [
          { destination: { $like: '%' + searchParam + '%' } },
          { note: { $like: '%' + searchParam + '%' } },
          { amount: { $like: '%' + searchParam + '%' } },
          { asset: { $like: '%' + searchParam + '%' } },
          { value: { $like: '%' + searchParam + '%' } },
          Sequelize.literal("associatedaddress.nick_name like '%" + searchParam + "%'"),
          Sequelize.literal("useraddress.nick_name like '%" + searchParam + "%'"),
          Sequelize.literal("userwallet.wallet_name like '%" + searchParam + "%'")
        ]}
      ]
    },
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

  export const findTransactionsBySearchTextEndDate = (id, typeName, searchParam, endDate):Object =>
  Transaction.findAll(Object.assign({
    where: {
      $and: [
        {transactionDate: {$lte: [endDate]}},
        {$or: [
          { destination: { $like: '%' + searchParam + '%' } },
          { note: { $like: '%' + searchParam + '%' } },
          { amount: { $like: '%' + searchParam + '%' } },
          { asset: { $like: '%' + searchParam + '%' } },
          { value: { $like: '%' + searchParam + '%' } },
          Sequelize.literal("associatedaddress.nick_name like '%" + searchParam + "%'"),
          Sequelize.literal("useraddress.nick_name like '%" + searchParam + "%'"),
          Sequelize.literal("userwallet.wallet_name like '%" + searchParam + "%'")
        ]}
      ]
    },
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchDate = (id, typeName, startDate, endDate):Object =>
  Transaction.findAll(Object.assign({
    where: {
      transactionDate: {$between: [startDate, endDate]}
    },
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchStartDate = (id, typeName, startDate):Object =>
  Transaction.findAll(Object.assign({
    where: {
      transactionDate: {$gte: [startDate]}
    },
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

  export const findTransactionsBySearchEndDate = (id, typeName, endDate):Object =>
  Transaction.findAll(Object.assign({
    where: {
      transactionDate: {$lte: [endDate]}
    },
    include: [
      {
        model: User,
        where: { id }
      },
      {
        model: TransactionType,
        where: { typeName }
      },
      {model: AssociatedAddress},
      {model: UserAddress},
      {model: UserWallet},
      {model: TransactionImportType}
    ]
  }))
  .then(obj => {
    return obj
  })

export const findTransactionById = (id):Object =>
  Transaction.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findTransactionByTrxId = (trxId):Object =>
  Transaction.findOne(Object.assign({
    where: {
      trxId
    }
  }))
  .then(obj => {
    return obj
  })

export const updateTransaction = (transactionObj): Promise<any> =>
  transactionObj.save()
  .then(obj => {
    return obj
  })

export const deleteTransactionById = (transactionId:number):Object =>
  Transaction.findById(transactionId)
  .then((object) => {
    if(null == object)
      return
    
    return object.destroy({ force: true })
  })