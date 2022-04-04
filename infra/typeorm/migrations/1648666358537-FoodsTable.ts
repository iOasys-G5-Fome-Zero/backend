import { MigrationInterface, QueryRunner } from 'typeorm';

export class FoodsTable1648666358537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE foods (
        id varchar(255) PRIMARY KEY,
        name varchar(255) NOT NULL UNIQUE,
        price_weight int NOT NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp 
    );
    ALTER TABLE foods ADD CONSTRAINT valid_price_weight CHECK (price_weight > 0);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE foods DROP CONSTRAINT valid_price_weight;
       DROP TABLE foods CASCADE;`,
    );
  }
}
