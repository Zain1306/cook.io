import { Entity, Column, PrimaryGeneratedColumn,Index, OneToMany } from 'typeorm';


@Entity()
export class User {
  @Index('user-index')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('user-mobile-index')
  @Column({ type: 'varchar', nullable: false })
  mobile: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Index('user-email-index')
  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Index('user-password-index')
  @Column({ type: 'varchar', nullable: true })
  password: string;


}
