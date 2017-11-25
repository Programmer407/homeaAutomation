/**
 * Created by Irfan on 05-Jul-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var dashboard_userdata = sequelize.define('dashboard_userdata',{

        did:{
            type: datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        area:{
            type:datatypes.STRING,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true,
        classMethods:{
            associate: function(models){
                dashboard_userdata.belongsTo(models.floor,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                dashboard_userdata.belongsTo(models.palace,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                dashboard_userdata.belongsTo(models.switches,{

                    foreignKey:{
                        allowNull:true
                    }
                });
                dashboard_userdata.belongsTo(models.user,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                dashboard_userdata.belongsTo(models.sensor,{

                    foreignKey:{
                        allowNull:true
                    }
                });





            }
        }


    });
    return dashboard_userdata;





}