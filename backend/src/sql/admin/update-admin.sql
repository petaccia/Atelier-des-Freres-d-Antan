UPDATE "Admin"
SET "password" = $2
WHERE "username" = $1
RETURNING *
