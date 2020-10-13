import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602606740015 implements MigrationInterface {
    name = 'createImages1602606740015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name:'images',
            columns:[
                {
                    name:'id',
                    type:'integer',
                    unsigned:true,
                    isPrimary:true,
                    isGenerated:true,
                    generationStrategy:"increment"
                },
                {
                    name:'path',
                    type:'varchar',
                    
                },
                {
                    name:'orphanateId',
                    type:'integer',
                    
                }
            ],
            foreignKeys:[
                {
                    name:'ImageOrphamage',
                    columnNames:['orphanateId'],
                    referencedTableName:'orphanages',
                    referencedColumnNames:['id'],
                    onUpdate:'CASCADE',
                    onDelete:'CASCADE',
                }
            ]
        }))
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
