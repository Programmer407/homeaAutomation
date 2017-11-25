/**
 * Created by Irfan on 05-Jul-17.
 */
var dashboarduserdataManager = require('../managers/dashboarduserdataManager');

module.exports = {

    findDashboardUserData:function(data,callback){
        console.log('findDashboardUserData   called')
        var user = data.user;
        let query_data = {user_name:user[0].dataValues.user_name}
        dashboarduserdataManager.getByUserid(query_data).then(function(dashboarduserdata) {

            if (dashboarduserdata) {
                data.dashboard_userdata = dashboarduserdata;
                callback(null, data);
            }
            else
                callback('error in getting data', null);


        })

        }







}