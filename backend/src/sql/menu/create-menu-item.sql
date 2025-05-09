INSERT INTO "Menu" ("title", "path", "icon", "parentId", "deviceType", "order")
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *
