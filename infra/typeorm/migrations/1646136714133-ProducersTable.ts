import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProducersTable1646136714133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE producers (
        user_id varchar(255) PRIMARY KEY REFERENCES users(id),
        big_basket varchar(255) NULL REFERENCES baskets(id),
        medium_basket varchar(255) NULL REFERENCES baskets(id),
        small_basket varchar(255) NULL REFERENCES baskets(id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE producers CASCADE;');
  }
}
