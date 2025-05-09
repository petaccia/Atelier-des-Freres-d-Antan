CREATE TABLE IF NOT EXISTS "Admin" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "username" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
)
