CREATE TABLE "user"(
  id SERIAL PRIMARY KEY,
  login VARCHAR(255),
  password VARCHAR(255),
  age INT
);

SELECT * FROM "user";

SELECT * FROM "user" where id = 1;

INSERT INTO "user" (login, password, age) VALUES ('xxx', 'abc123', 18);
INSERT INTO "user" (login, password, age) VALUES ('xxx', 'abc123', 18) RETURNING *;

UPDATE "user" SET age = 32 WHERE id = 1;
UPDATE "user" SET age = 32 WHERE id = 1 RETURNING *;

DELETE FROM "user" WHERE id = 2;
DELETE FROM "user" WHERE id = 2 RETURNING *;
