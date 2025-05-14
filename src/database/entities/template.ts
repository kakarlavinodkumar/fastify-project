import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('templates')
export class Template {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'modified_at' })
    modifiedAt!: Date;

    @Column({ name: 'last_used', type: 'timestamp', nullable: true })
    lastUsed!: Date | null;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'jsonb', nullable: true })
    variables!: Array<{
        key: string;
        name: string;
        description: string;
        default_value: string | null;
    }>;

    @Column({ type: 'jsonb', nullable: true })
    push!: {
        notification: {
            alert: string;
        };
    };
}