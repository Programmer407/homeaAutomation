import Sequelize from "sequelize"

// src
import Transaction from '../models/Transaction'
import User from '../models/User'
import TransactionType from '../models/TransactionType'
import AssociatedAddress from '../models/AssociatedAddress'
import UserAddress from '../models/UserAddress'
import UserWallet from '../models/UserWallet'
import TransactionImportType from '../models/TransactionImportType'

export const findTransactionsByUserId = (id, typeName, orderBy, limit, offset) =>
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
    // order: [[Sequelize.literal(orderBy + ' ' + orderWay)], [Sequelize.literal('destination ASC')]]
    // order: [[Sequelize.literal('transactionimporttype.import_type_name ASC, useraddress.nick_name ASC, userwallet.wallet_name ASC')], [Sequelize.literal('useraddress.nick_name ASC')], [Sequelize.literal('userwallet.wallet_name ASC')]]
    // order: Sequelize.literal('transactionimporttype.import_type_name ASC, useraddress.nick_name ASC, userwallet.wallet_name ASC')
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchText = (id, typeName, searchParam, orderBy, limit, offset) =>
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
    ],
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchTextDate = (id, typeName, searchParam, startDate, endDate, orderBy, limit, offset) =>
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
    ],
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchTextStartDate = (id, typeName, searchParam, startDate, orderBy, limit, offset) =>
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
    ],
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

  export const findTransactionsBySearchTextEndDate = (id, typeName, searchParam, endDate, orderBy, limit, offset) =>
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
    ],
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchDate = (id, typeName, startDate, endDate, orderBy, limit, offset) =>
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
    ],
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

export const findTransactionsBySearchStartDate = (id, typeName, startDate, orderBy, limit, offset) =>
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
    ],
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

  export const findTransactionsBySearchEndDate = (id, typeName, endDate, orderBy, limit, offset) =>
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
    ],
    limit: limit,
    offset: offset,
    order: Sequelize.literal(orderBy)
  }))
  .then(obj => {
    return obj
  })

export const findTransactionById = (id) =>
  Transaction.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findTransactionByTrxId = (trxId) =>
  Transaction.findOne(Object.assign({
    where: {
      trxId
    }
  }))
  .then(obj => {
    return obj
  })

export const updateTransaction = (transactionObj) =>
  transactionObj.save()
  .then(obj => {
    return obj
  })

export const deleteTransactionById = (transactionId) =>
  Transaction.findById(transactionId)
  .then((object) => {
    if (object === null)
      return
    
    return object.destroy({ force: true })
  })
