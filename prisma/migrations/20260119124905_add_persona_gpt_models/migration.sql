-- CreateTable
CREATE TABLE "Persona" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "age" INTEGER,
    "occupation" TEXT,
    "background" TEXT,
    "avatarUrl" TEXT,
    "voiceProfile" TEXT,
    "beliefs" TEXT,
    "toneProfile" TEXT,
    "behaviors" TEXT,
    "category" TEXT,
    "isPrebuilt" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsed" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PersonaScenario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personaId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "context" TEXT,
    "scenarioType" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "response" TEXT,
    "relationshipContext" TEXT,
    "emotionalState" TEXT,
    "stressLevel" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonaScenario_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonaResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personaId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "scenario" TEXT,
    "targetAudience" TEXT,
    "rating" INTEGER,
    "feedback" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PersonaResponse_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UseCaseTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "fields" TEXT NOT NULL,
    "prompts" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Persona_category_idx" ON "Persona"("category");

-- CreateIndex
CREATE INDEX "Persona_isPrebuilt_idx" ON "Persona"("isPrebuilt");

-- CreateIndex
CREATE INDEX "Persona_createdAt_idx" ON "Persona"("createdAt");

-- CreateIndex
CREATE INDEX "PersonaScenario_personaId_idx" ON "PersonaScenario"("personaId");

-- CreateIndex
CREATE INDEX "PersonaScenario_scenarioType_idx" ON "PersonaScenario"("scenarioType");

-- CreateIndex
CREATE INDEX "PersonaScenario_createdAt_idx" ON "PersonaScenario"("createdAt");

-- CreateIndex
CREATE INDEX "PersonaResponse_personaId_idx" ON "PersonaResponse"("personaId");

-- CreateIndex
CREATE INDEX "PersonaResponse_contentType_idx" ON "PersonaResponse"("contentType");

-- CreateIndex
CREATE INDEX "PersonaResponse_createdAt_idx" ON "PersonaResponse"("createdAt");

-- CreateIndex
CREATE INDEX "UseCaseTemplate_category_idx" ON "UseCaseTemplate"("category");
