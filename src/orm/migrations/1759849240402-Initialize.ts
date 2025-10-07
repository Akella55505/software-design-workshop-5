import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1759849240402 implements MigrationInterface {
  name = 'Initialize1759849240402';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "Судове_рішення" (
                "ID" BIGSERIAL NOT NULL,
                "рішення" text NOT NULL,
                "ДТП_id" bigint,
                CONSTRAINT "REL_0e1233a42961aa56f17a1dab2f" UNIQUE ("ДТП_id"),
                CONSTRAINT "PK_eea2e636d6b1815a2fd10d099ef" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "tbl_ДТП_MM_Транспортний_засіб" (
                "ID" BIGSERIAL NOT NULL,
                "ДТП_id" bigint,
                "Транспортний_засіб_id" bigint,
                CONSTRAINT "PK_d2340a12143e2430e046b38d769" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Страхова_виплата" (
                "ID" BIGSERIAL NOT NULL,
                "сума" bigint NOT NULL,
                "Персона_id" bigint,
                "Страхова_оцінка_id" bigint,
                CONSTRAINT "PK_410b171cbf89cd1aa2937888cbf" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Медик" (
                "Номер_ліцензії" bigint NOT NULL,
                "імʼя" character varying NOT NULL,
                "прізвище" character varying NOT NULL,
                "по_батькові" character varying NOT NULL,
                CONSTRAINT "PK_4c6f1c47bab175bdb27bcc4a905" PRIMARY KEY ("Номер_ліцензії")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Медичний_висновок" (
                "ID" BIGSERIAL NOT NULL,
                "вирок" text NOT NULL,
                "ДТП_id" bigint,
                "Медик_id" bigint,
                "Персона_id" bigint,
                CONSTRAINT "PK_e8a21754d486d7f3b055b7380af" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."accident_role" AS ENUM('Винуватець', 'Потерпілий')
        `);
    await queryRunner.query(`
            CREATE TABLE "tbl_ДТП_MM_Персона" (
                "ID" BIGSERIAL NOT NULL,
                "роль" "public"."accident_role" NOT NULL,
                "ДТП_id" bigint,
                "Персона_id" bigint,
                CONSTRAINT "PK_87666cfcf1ae6d683e63465e902" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Поліцейський" (
                "Номер_посвідчення" bigint NOT NULL,
                "імʼя" character varying NOT NULL,
                "прізвище" character varying NOT NULL,
                "по_батькові" character varying NOT NULL,
                CONSTRAINT "PK_3a56f3a0cdfd267640078b56e77" PRIMARY KEY ("Номер_посвідчення")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Адміністративна_постанова" (
                "ID" BIGSERIAL NOT NULL,
                "постанова" text NOT NULL,
                "ДТП_id" bigint,
                "Персона_id" bigint,
                "Поліцейський_id" bigint,
                CONSTRAINT "PK_2ead3dd87405d48c195b309fa43" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Персона" (
                "ID" BIGSERIAL NOT NULL,
                "паспортні_дані" character varying NOT NULL,
                "імʼя" character varying NOT NULL,
                "прізвище" character varying NOT NULL,
                "по_батькові" character varying NOT NULL,
                "посвідчення_водія" jsonb,
                CONSTRAINT "PK_0b79030e7a77fb86d48e78c1ce3" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Транспортний_засіб" (
                "ID" BIGSERIAL NOT NULL,
                "vin_код" character varying(17) NOT NULL,
                "марка" character varying(20) NOT NULL,
                "модель" character varying(20) NOT NULL,
                "номерний_знак" character varying(8) NOT NULL,
                "персона_id" bigint,
                CONSTRAINT "PK_82101abfc7902bfee6fe7207ea6" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "Страхова_оцінка" (
                "ID" BIGSERIAL NOT NULL,
                "висновок" text NOT NULL,
                "ДТП_id" bigint,
                "Транспортний_засіб_id" bigint,
                CONSTRAINT "PK_b0af5eafdec6bcac98222b898a1" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."consideration_status" AS ENUM(
                'Зареєстровано',
                'Передано до суду',
                'Розглянуто'
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."assessment_status" AS ENUM('На розгляді', 'Оцінено', 'Узгоджено')
        `);
    await queryRunner.query(`
            CREATE TABLE "ДТП" (
                "ID" BIGSERIAL NOT NULL,
                "дата" date NOT NULL,
                "медіа" jsonb,
                "місце" text NOT NULL,
                "причини" text NOT NULL,
                "статус_розгляду" "public"."consideration_status" NOT NULL DEFAULT 'Зареєстровано',
                "статус_оцінки" "public"."assessment_status" NOT NULL DEFAULT 'На розгляді',
                "тип" text NOT NULL,
                "час" TIME NOT NULL,
                CONSTRAINT "PK_32ca03413185189fdee911f2aae" PRIMARY KEY ("ID")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying
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
            ALTER TABLE "users" DROP COLUMN "name"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(40)
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying(40)
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying(100)
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
    await queryRunner.query(`
            DROP TABLE "ДТП"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."assessment_status"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."consideration_status"
        `);
    await queryRunner.query(`
            DROP TABLE "Страхова_оцінка"
        `);
    await queryRunner.query(`
            DROP TABLE "Транспортний_засіб"
        `);
    await queryRunner.query(`
            DROP TABLE "Персона"
        `);
    await queryRunner.query(`
            DROP TABLE "Адміністративна_постанова"
        `);
    await queryRunner.query(`
            DROP TABLE "Поліцейський"
        `);
    await queryRunner.query(`
            DROP TABLE "tbl_ДТП_MM_Персона"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."accident_role"
        `);
    await queryRunner.query(`
            DROP TABLE "Медичний_висновок"
        `);
    await queryRunner.query(`
            DROP TABLE "Медик"
        `);
    await queryRunner.query(`
            DROP TABLE "Страхова_виплата"
        `);
    await queryRunner.query(`
            DROP TABLE "tbl_ДТП_MM_Транспортний_засіб"
        `);
    await queryRunner.query(`
            DROP TABLE "Судове_рішення"
        `);
  }
}
