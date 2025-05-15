import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    Id!: number;

    @Column()
    flightInstanceId!: string;

    @Column()
    flightNumber!: string;

    @Column({
        type: 'enum',
        enum: ['Automated', 'Ad-hoc'],
    })
    type!: 'Automated' | 'Ad-hoc';

    @Column({
        type: 'enum',
        enum: ['Sent', 'Scheduled', 'Paused', 'UnScheduled'],
    })
    action!: 'Sent' | 'Scheduled' | 'Paused' | 'UnScheduled';

    @Column({
        type: 'enum',
        enum: ['sms', 'email'],
    })
    channel!: 'sms' | 'email';

    @Column()
    time!: Date;

    @Column()
    message!: string

    @Column()
    templateId!: string;
}