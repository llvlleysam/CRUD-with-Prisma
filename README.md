npm i @prisma/client
-------------------------
npm i -D prisma
-----------------------------
npx prisma init
----------------------------------
than 
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model user {
  id     Int     @id @default(autoincrement())
  name   String
  family String
  age    Int
  liked  Boolean
}
---------------------------
than 

# اگر دیتابیس خالی است و می‌خواهی با migration بسازی:
npx prisma migrate dev --name init

# یا اگر نمی‌خواهی migration بسازی و فقط جدول‌ها ساخته شوند:
# npx prisma db push
------------------------------
اگر بعدا مدل را تغییر دادی و دیدی خطای “@prisma/client did not initialize yet” گرفتی:

npx prisma generate

