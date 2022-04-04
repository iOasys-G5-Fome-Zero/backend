import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedFoodsTable1648667893905 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE removed_foods (
            id varchar(255) PRIMARY KEY,
            consumer_id varchar(255) NOT NULL REFERENCES consumers(user_id),
            food_id varchar(255) NOT NULL REFERENCES foods(id),
            quantity int NOT NULL
        );
        ALTER TABLE removed_foods ADD CONSTRAINT valid_quantity CHECK (quantity > 0);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE removed_foods DROP CONSTRAINT valid_quantity;
       DROP TABLE removed_foods;`,
    );
  }
}
