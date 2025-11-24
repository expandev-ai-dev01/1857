/*
DROP TABLE [security].[user];
DROP SCHEMA [security];
*/

CREATE SCHEMA [security];
GO

CREATE TABLE [security].[user] (
  [idUser] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [email] NVARCHAR(200) NOT NULL,
  [passwordHash] NVARCHAR(500) NOT NULL,
  [role] NVARCHAR(50) NOT NULL DEFAULT ('User'), -- 'User', 'Donor', 'Admin'
  [active] BIT NOT NULL DEFAULT (1),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

ALTER TABLE [security].[user]
ADD CONSTRAINT [pkUser] PRIMARY KEY CLUSTERED ([idUser]);
GO

ALTER TABLE [security].[user]
ADD CONSTRAINT [fkUser_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

ALTER TABLE [security].[user]
ADD CONSTRAINT [uqUser_Email] UNIQUE ([email]);
GO
