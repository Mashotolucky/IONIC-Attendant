import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/users.entity';

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
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

}