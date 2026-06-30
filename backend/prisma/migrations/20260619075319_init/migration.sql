-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phone" TEXT NOT NULL,
    "fullName" TEXT,
    "email" TEXT,
    "role" TEXT NOT NULL DEFAULT 'sale',
    "teamId" INTEGER,
    "avatarUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "developer" TEXT,
    "estateType" TEXT NOT NULL,
    "imageUrl" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'opening',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Subdivision" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "floorCount" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Subdivision_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subdivisionId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "floorNumber" INTEGER,
    "roomNumber" TEXT,
    "direction" TEXT,
    "areaUsable" REAL,
    "areaCarpet" REAL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "lockExpireAt" DATETIME,
    CONSTRAINT "Product_subdivisionId_fkey" FOREIGN KEY ("subdivisionId") REFERENCES "Subdivision" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LockOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "saleId" INTEGER NOT NULL,
    "lockTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireTime" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "note" TEXT,
    CONSTRAINT "LockOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LockOrder_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
