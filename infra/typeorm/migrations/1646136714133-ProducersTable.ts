import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProducersTable1646136714133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE producers (
        user_id varchar(255) PRIMARY KEY REFERENCES users(id),
        big_basket varchar(255) NULL REFERENCES baskets(id),
        medium_basket varchar(255) NULL REFERENCES baskets(id),
        small_basket varchar(255) NULL REFERENCES baskets(id),
        cpf_pix varchar(255) NULL UNIQUE,
        email_pix varchar(255) NULL UNIQUE,
        phone_pix varchar(255) NULL UNIQUE,
        random_pix varchar(255) NULL UNIQUE,
        balance decimal(6,2) NOT NULL DEFAULT 0
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE producers CASCADE;');
  }
}
