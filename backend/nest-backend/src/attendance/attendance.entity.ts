import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Attendance extends Model<Attendance> {
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    temperature: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    covid_symptoms_status: Boolean;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    time: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

}