import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('scopes')
export class Scope {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'enum', enum: ['Global', 'Station', 'Flight'], unique: true })
    name!: 'Global' | 'Station' | 'Flight';

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}