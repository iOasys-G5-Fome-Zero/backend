import { MigrationInterface, QueryRunner } from 'typeorm';

export class BasketsTable1644678124515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TYPE basket_size AS ENUM ('big','medium','small');
    CREATE TYPE basket_rate AS ENUM ('7', '15');
    CREATE TABLE baskets (
        id varchar PRIMARY KEY,
        size basket_size NOT NULL,
        days_per_deliver basket_rate NOT NULL,
        value decimal(6,2) NOT NULL,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamp
    );
    ALTER TABLE baskets ADD CONSTRAINT valid_basket_value CHECK (value > 0);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE baskets DROP CONSTRAINT valid_basket_value;
         DROP TYPE basket_rate CASCADE;
         DROP TYPE basket_size CASCADE; 
         DROP TABLE baskets CASCADE;`,
    );
  }
}
