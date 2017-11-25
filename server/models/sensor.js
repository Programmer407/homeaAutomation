/**
 * Created by Irfan on 22-May-17.
 */
"use strict"

module.exports =  function(sequelize,datatypes){

    var sensor = sequelize.define('sensor',{

        sensor_id:{
            type: datatypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        name:{
            type:datatypes.STRING,
            allowNull:false
        },
        value:{
            type:datatypes.INTEGER,
            allowNull:false
        }




    },{
        timestamps:false,
        freezeTableName:true,
        classMethods:{
            associate: function(models){
                sensor.belongsTo(models.sensor_type,{

                    foreignKey:{
                        allowNull:false
                    }
                });
                sensor.belongsTo(models.palace,{

                    foreignKey:{
                        allowNull:false
                    }
                });



            }
        }


    });
    return sensor;





}/**
 * Created by Irfan on 22-May-17.
 */
