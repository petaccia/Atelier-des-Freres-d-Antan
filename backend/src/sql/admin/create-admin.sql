INSERT INTO "Admin" ("username", "password")
VALUES ($1, $2)
RETURNING *
