// libs
import Provider from '../models/Provider'

export const findProviderByID = (id) =>
  Provider.findOne(Object.assign({
    where: {
      id
    }
  }))
  .then(obj => {
    return obj
  })

export const findAllProviderList = () =>
  Provider.findAll()
  .then(obj => {
    return obj
  })

export const findProviderByName = (providerName) =>
  Provider.findOne(Object.assign({
    where: {
      providerName
    }
  }))
  .then(obj => {
    return obj
  })
