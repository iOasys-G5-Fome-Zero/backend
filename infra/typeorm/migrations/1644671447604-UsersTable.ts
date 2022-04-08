import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1644671447604 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE user_type AS ENUM ('consumer','producer');
        CREATE TABLE users (
            id varchar(255) PRIMARY KEY,
            first_name varchar(255) NOT NULL,
            last_name varchar(255) NULL,
            user_type user_type NOT NULL,
            email varchar(255) UNIQUE,
            phone varchar(255) UNIQUE,
            cpf varchar(33) NULL,
            password varchar(255) NULL,
            token varchar(255) NULL UNIQUE,
            refresh_token varchar(255) NULL UNIQUE,
            created_at timestamp DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
            deleted_at timestamp 
        );
        ALTER TABLE users ADD CONSTRAINT email_or_phone_null CHECK (phone IS NOT NULL OR email IS NOT NULL);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users DROP CONSTRAINT email_or_phone_null;
       DROP TABLE users CASCADE; 
       DROP TYPE user_type;`,
    );
  }
}
