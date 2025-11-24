/*
DROP TABLE [config].[systemSettings];
DROP SCHEMA [config];
*/

CREATE SCHEMA [config];
GO

CREATE TABLE [config].[systemSettings] (
  [idSystemSettings] INTEGER IDENTITY(1, 1) NOT NULL,
  [key] NVARCHAR(100) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(500) NULL
);
GO

ALTER TABLE [config].[systemSettings]
ADD CONSTRAINT [pkSystemSettings] PRIMARY KEY CLUSTERED ([idSystemSettings]);
GO

ALTER TABLE [config].[systemSettings]
ADD CONSTRAINT [uqSystemSettings_Key] UNIQUE ([key]);
GO
