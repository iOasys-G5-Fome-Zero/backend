import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConsumersTableTable1648237294771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE consumers (
            user_id varchar(255) PRIMARY KEY REFERENCES users(id),
            basket_id varchar(255) NULL REFERENCES baskets(id),
            basket_producer_id varchar(255) NULL REFERENCES producers(user_id),
            crypto_coins int NOT NULL DEFAULT 0,
            receipt_url varchar NULL
        );
        ALTER TABLE consumers ADD CONSTRAINT valid_crypto_coins CHECK (crypto_coins >= 0);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE consumers DROP CONSTRAINT valid_crypto_coins;
    DROP TABLE consumers;
    `);
  }
}
