import { MigrationInterface, QueryRunner } from 'typeorm';

export class BasketFoodsTable1648671519868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE basket_foods (
            id varchar(255) PRIMARY KEY,
            basket_id varchar(255) NOT NULL REFERENCES baskets(id),
            food_id varchar(255) NOT NULL REFERENCES foods(id),
            quantity int NOT NULL
        );
        ALTER TABLE basket_foods ADD CONSTRAINT valid_quantity CHECK (quantity > 0);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE basket_foods DROP CONSTRAINT valid_quantity;
    DROP TABLE basket_foods CASCADE;`);
  }
}
