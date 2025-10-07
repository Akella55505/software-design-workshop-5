import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascading1759836884484 implements MigrationInterface {
  name = 'AddCascading1759836884484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Судове_рішення" DROP CONSTRAINT "FK_0e1233a42961aa56f17a1dab2f7"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб" DROP CONSTRAINT "FK_7ac1abe260bc58d9ef01ba665a4"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб" DROP CONSTRAINT "FK_3cc8836197c638655ad9721fa40"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата" DROP CONSTRAINT "FK_928ad65bfbe7f5b7b7a2bf2699b"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата" DROP CONSTRAINT "FK_7d6b0cd1892a983dd12f6fef247"
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок" DROP CONSTRAINT "FK_924d053f654afaa0a07b321c3b9"
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок" DROP CONSTRAINT "FK_426659eebc64612846d4a1454f7"
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок" DROP CONSTRAINT "FK_3f897244bc346df379a89f52b2d"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона" DROP CONSTRAINT "FK_505c81656f3e87460c04208c11a"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона" DROP CONSTRAINT "FK_827ceb51f217fd46825653e6448"
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова" DROP CONSTRAINT "FK_9754e70a848042feb9dd4f9adac"
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова" DROP CONSTRAINT "FK_1f37e96d6c7150ec194bf39728a"
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова" DROP CONSTRAINT "FK_3bd4d421ed14044b40e6f7d66b8"
        `);
    await queryRunner.query(`
            ALTER TABLE "Транспортний_засіб" DROP CONSTRAINT "FK_bc99101a87eb13c884c1ff5a2e9"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка" DROP CONSTRAINT "FK_a1cc0f2f4ce920873e504e05ad0"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка" DROP CONSTRAINT "FK_d48dc04ea1d38a8043fd2656554"
        `);
    await queryRunner.query(`
            ALTER TABLE "Судове_рішення"
            ADD CONSTRAINT "FK_0e1233a42961aa56f17a1dab2f7" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб"
            ADD CONSTRAINT "FK_7ac1abe260bc58d9ef01ba665a4" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб"
            ADD CONSTRAINT "FK_3cc8836197c638655ad9721fa40" FOREIGN KEY ("Транспортний_засіб_id") REFERENCES "Транспортний_засіб"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата"
            ADD CONSTRAINT "FK_928ad65bfbe7f5b7b7a2bf2699b" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата"
            ADD CONSTRAINT "FK_7d6b0cd1892a983dd12f6fef247" FOREIGN KEY ("Страхова_оцінка_id") REFERENCES "Страхова_оцінка"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок"
            ADD CONSTRAINT "FK_924d053f654afaa0a07b321c3b9" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок"
            ADD CONSTRAINT "FK_426659eebc64612846d4a1454f7" FOREIGN KEY ("Медик_id") REFERENCES "Медик"("Номер_ліцензії") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок"
            ADD CONSTRAINT "FK_3f897244bc346df379a89f52b2d" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона"
            ADD CONSTRAINT "FK_505c81656f3e87460c04208c11a" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона"
            ADD CONSTRAINT "FK_827ceb51f217fd46825653e6448" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова"
            ADD CONSTRAINT "FK_9754e70a848042feb9dd4f9adac" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова"
            ADD CONSTRAINT "FK_1f37e96d6c7150ec194bf39728a" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова"
            ADD CONSTRAINT "FK_3bd4d421ed14044b40e6f7d66b8" FOREIGN KEY ("Поліцейський_id") REFERENCES "Поліцейський"("Номер_посвідчення") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Транспортний_засіб"
            ADD CONSTRAINT "FK_bc99101a87eb13c884c1ff5a2e9" FOREIGN KEY ("персона_id") REFERENCES "Персона"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка"
            ADD CONSTRAINT "FK_a1cc0f2f4ce920873e504e05ad0" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка"
            ADD CONSTRAINT "FK_d48dc04ea1d38a8043fd2656554" FOREIGN KEY ("Транспортний_засіб_id") REFERENCES "Транспортний_засіб"("ID") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка" DROP CONSTRAINT "FK_d48dc04ea1d38a8043fd2656554"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка" DROP CONSTRAINT "FK_a1cc0f2f4ce920873e504e05ad0"
        `);
    await queryRunner.query(`
            ALTER TABLE "Транспортний_засіб" DROP CONSTRAINT "FK_bc99101a87eb13c884c1ff5a2e9"
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова" DROP CONSTRAINT "FK_3bd4d421ed14044b40e6f7d66b8"
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова" DROP CONSTRAINT "FK_1f37e96d6c7150ec194bf39728a"
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова" DROP CONSTRAINT "FK_9754e70a848042feb9dd4f9adac"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона" DROP CONSTRAINT "FK_827ceb51f217fd46825653e6448"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона" DROP CONSTRAINT "FK_505c81656f3e87460c04208c11a"
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок" DROP CONSTRAINT "FK_3f897244bc346df379a89f52b2d"
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок" DROP CONSTRAINT "FK_426659eebc64612846d4a1454f7"
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок" DROP CONSTRAINT "FK_924d053f654afaa0a07b321c3b9"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата" DROP CONSTRAINT "FK_7d6b0cd1892a983dd12f6fef247"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата" DROP CONSTRAINT "FK_928ad65bfbe7f5b7b7a2bf2699b"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб" DROP CONSTRAINT "FK_3cc8836197c638655ad9721fa40"
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб" DROP CONSTRAINT "FK_7ac1abe260bc58d9ef01ba665a4"
        `);
    await queryRunner.query(`
            ALTER TABLE "Судове_рішення" DROP CONSTRAINT "FK_0e1233a42961aa56f17a1dab2f7"
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка"
            ADD CONSTRAINT "FK_d48dc04ea1d38a8043fd2656554" FOREIGN KEY ("Транспортний_засіб_id") REFERENCES "Транспортний_засіб"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_оцінка"
            ADD CONSTRAINT "FK_a1cc0f2f4ce920873e504e05ad0" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Транспортний_засіб"
            ADD CONSTRAINT "FK_bc99101a87eb13c884c1ff5a2e9" FOREIGN KEY ("персона_id") REFERENCES "Персона"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова"
            ADD CONSTRAINT "FK_3bd4d421ed14044b40e6f7d66b8" FOREIGN KEY ("Поліцейський_id") REFERENCES "Поліцейський"("Номер_посвідчення") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова"
            ADD CONSTRAINT "FK_1f37e96d6c7150ec194bf39728a" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Адміністративна_постанова"
            ADD CONSTRAINT "FK_9754e70a848042feb9dd4f9adac" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона"
            ADD CONSTRAINT "FK_827ceb51f217fd46825653e6448" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Персона"
            ADD CONSTRAINT "FK_505c81656f3e87460c04208c11a" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок"
            ADD CONSTRAINT "FK_3f897244bc346df379a89f52b2d" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок"
            ADD CONSTRAINT "FK_426659eebc64612846d4a1454f7" FOREIGN KEY ("Медик_id") REFERENCES "Медик"("Номер_ліцензії") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Медичний_висновок"
            ADD CONSTRAINT "FK_924d053f654afaa0a07b321c3b9" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата"
            ADD CONSTRAINT "FK_7d6b0cd1892a983dd12f6fef247" FOREIGN KEY ("Страхова_оцінка_id") REFERENCES "Страхова_оцінка"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Страхова_виплата"
            ADD CONSTRAINT "FK_928ad65bfbe7f5b7b7a2bf2699b" FOREIGN KEY ("Персона_id") REFERENCES "Персона"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб"
            ADD CONSTRAINT "FK_3cc8836197c638655ad9721fa40" FOREIGN KEY ("Транспортний_засіб_id") REFERENCES "Транспортний_засіб"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "tbl_ДТП_MM_Транспортний_засіб"
            ADD CONSTRAINT "FK_7ac1abe260bc58d9ef01ba665a4" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "Судове_рішення"
            ADD CONSTRAINT "FK_0e1233a42961aa56f17a1dab2f7" FOREIGN KEY ("ДТП_id") REFERENCES "ДТП"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
