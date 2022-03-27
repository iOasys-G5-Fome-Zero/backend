import { MigrationInterface, QueryRunner } from 'typeorm';

export class SellersTable1648237294771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE sellers (
            user_id varchar(255) PRIMARY KEY REFERENCES users(id)
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE sellers');
  }
}
