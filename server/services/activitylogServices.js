/**
 * Created by Irfan on 02-Jul-17.
 */
var activitylogManager = require('../managers/activitylogManager')

module.exports={

    findActivity:function(data,callback)
    {
       // var home_id = data.home_id;
        activitylogManager.getByHomeId(data).then(function(log){
            if(log)
            {
                data.activity_log = log;
                callback(null,data);

            }
            else
                callback('error in getting activity log',null);

        })




    }


}