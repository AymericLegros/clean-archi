import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';
import { HelloCharlyData } from '../../domain/models/data.model';

@Entity({ name: 'HelloCharlyDatas' })
export class HelloCharlyDataEntity extends HelloCharlyData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'data' })
  data: string;

  @CreateDateColumn()
  createdAt: Date;
}
