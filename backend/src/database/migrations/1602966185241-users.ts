import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class users1602966185241 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'users',
            columns: [
              {
                name: 'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
              name: 'name',
              type: 'varchar',
              },
              {
              name: 'email',
              type: 'varchar',
              },
              {
                name: 'senha',
                type: 'integer',
                isGenerated: true,
              },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
