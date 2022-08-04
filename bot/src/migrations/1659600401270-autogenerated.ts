import { MigrationInterface, QueryRunner } from 'typeorm';

export class autogenerated1659600401270 implements MigrationInterface {
    name = 'autogenerated1659600401270';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `guild` (`id` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `version` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `guild`');
    }
}
