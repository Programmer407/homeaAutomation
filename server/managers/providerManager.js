// libs
import Provider from '../models/Provider';

export const findAllProviderList = (): Promise<any> =>
  Provider.findAll()
  .then(obj => {
    console.log('obj : ' + obj)
    return obj
  })

export const findProviderByName = (providerName:string): Promise<any> =>
  Provider.findOne(Object.assign({
    where: {
      providerName
    }
  }))
  .then(obj => {
    return obj
  })


