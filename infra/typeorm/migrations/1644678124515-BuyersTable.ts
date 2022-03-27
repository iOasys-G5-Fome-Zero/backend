import { MigrationInterface, QueryRunner } from 'typeorm';

export class BuyersTable1644678124515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE buyers (
            user_id varchar(255) PRIMARY KEY REFERENCES users(id)
        );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE buyers');
  }
}
