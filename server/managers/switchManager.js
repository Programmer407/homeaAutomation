/**
 * Created by Irfan on 11-Jun-17.
 */

var models = require('../models');

module.exports = {

    getByPalace:function(query_data)
    {
        return models.switches.findAll({where:{palacePalaceId:query_data.palaces},include:models.appliance});
    },
    updateStatusById:function(query_data){

        return models.switches.update({  status:query_data.status},{ where:{switch_id:query_data.switch_id}});



    }



}