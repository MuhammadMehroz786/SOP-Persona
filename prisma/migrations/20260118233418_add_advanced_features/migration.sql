-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sopId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "changes" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SOP" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "version" TEXT NOT NULL DEFAULT '1.0',
    "industry" TEXT NOT NULL DEFAULT 'general',
    "tone" TEXT NOT NULL DEFAULT 'formal',
    "language" TEXT NOT NULL DEFAULT 'en',
    "aiPromptUsed" TEXT,
    "regulatoryFramework" TEXT,
    "effectiveDate" DATETIME,
    "reviewDate" DATETIME,
    "expirationDate" DATETIME,
    "incidentCount" INTEGER NOT NULL DEFAULT 0,
    "complianceScore" REAL,
    "customBranding" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_SOP" ("category", "content", "createdAt", "description", "id", "status", "title", "updatedAt", "version") SELECT "category", "content", "createdAt", "description", "id", "status", "title", "updatedAt", "version" FROM "SOP";
DROP TABLE "SOP";
ALTER TABLE "new_SOP" RENAME TO "SOP";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "AuditLog_sopId_idx" ON "AuditLog"("sopId");

-- CreateIndex
CREATE INDEX "AuditLog_timestamp_idx" ON "AuditLog"("timestamp");
