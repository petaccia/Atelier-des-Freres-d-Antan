UPDATE "Menu"
SET 
  "title" = $2,
  "path" = $3,
  "icon" = $4,
  "parentId" = $5,
  "order" = $6,
  "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = $1
RETURNING *
