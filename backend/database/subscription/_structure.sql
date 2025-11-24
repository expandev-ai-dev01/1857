/*
DROP TABLE [subscription].[account];
DROP SCHEMA [subscription];
*/

CREATE SCHEMA [subscription];
GO

CREATE TABLE [subscription].[account] (
  [idAccount] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [active] BIT NOT NULL DEFAULT (1),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

ALTER TABLE [subscription].[account]
ADD CONSTRAINT [pkAccount] PRIMARY KEY CLUSTERED ([idAccount]);
GO
