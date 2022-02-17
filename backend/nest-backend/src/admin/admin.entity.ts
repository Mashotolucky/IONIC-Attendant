import {Table, Column, Model, DataType} from 'sequelize-typescript'

@Table 
export class Admin extends Model<Admin> {
    @Column({
        type:DataType.STRING,
        allowNull:false
     })
    firstname: string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    lastname: string;
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    employeenumber: string;

   @Column({
       type:DataType.STRING,
       allowNull:false
   })
   email: string;

   @Column({
       type:DataType.STRING,
       allowNull:false
   })
   password: string;


}