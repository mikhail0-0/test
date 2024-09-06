import { Column, Entity } from 'typeorm';

enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

@Entity({ name: 'users' })
export class UserEntity {
  @Column({ type: 'uuid', generated: 'uuid', primary: true })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'smallint' })
  age: number;

  @Column({ type: 'enum', enum: EGender })
  gender: EGender;

  @Column({type: 'boolean'})
  problems: boolean;
}
