import errorUtils from './../../utils/errorUtils';

const get = (req, res, manager) => {
    
  const id = req.params.id;    
  let promise = null;
  let resultCount = 0;
  const offset = parseInt(req.query.offset || 0);
  const limit = parseInt(req.query.limit || 15);                  
  
  if(null == id){        
    promise = manager.count()
    .then((count) => {                        
      resultCount = count;        
      return manager.findAll({offset: offset, limit: limit});
    });      
  }
  else
    promise = manager.findById(id);
    
  promise
  .then((result) => {      
    const response = null == id ? {offset: offset, count: limit, totalCount: resultCount, list: result} : result;
    res.send(response);
  })
  .catch((error) => {
    return errorUtils.caughtError(res, error);
  });              
};


export default {
  get: get
}
