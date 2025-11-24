/*
DROP TABLE [functional].[donorRequest];
DROP TABLE [functional].[animalPhoto];
DROP TABLE [functional].[animal];
DROP SCHEMA [functional];
*/

CREATE SCHEMA [functional];
GO

-- Animal Table
CREATE TABLE [functional].[animal] (
  [idAnimal] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idUser] INTEGER NOT NULL, -- Donor ID
  [name] NVARCHAR(100) NOT NULL,
  [species] NVARCHAR(50) NOT NULL,
  [breed] NVARCHAR(50) NULL,
  [ageYears] INTEGER NOT NULL DEFAULT (0),
  [ageMonths] INTEGER NOT NULL DEFAULT (0),
  [size] NVARCHAR(20) NOT NULL,
  [gender] NVARCHAR(20) NOT NULL,
  [description] NVARCHAR(1000) NOT NULL,
  [temperament] NVARCHAR(MAX) NULL, -- JSON Array
  [healthStatus] NVARCHAR(MAX) NULL, -- JSON Array
  [locationCity] NVARCHAR(100) NOT NULL,
  [locationState] NVARCHAR(2) NOT NULL,
  [contactInfo] NVARCHAR(200) NOT NULL,
  [status] NVARCHAR(50) NOT NULL DEFAULT ('Disponível'),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [deleted] BIT NOT NULL DEFAULT (0)
);
GO

ALTER TABLE [functional].[animal]
ADD CONSTRAINT [pkAnimal] PRIMARY KEY CLUSTERED ([idAnimal]);
GO

ALTER TABLE [functional].[animal]
ADD CONSTRAINT [fkAnimal_Account] FOREIGN KEY ([idAccount])
REFERENCES [subscription].[account]([idAccount]);
GO

ALTER TABLE [functional].[animal]
ADD CONSTRAINT [fkAnimal_User] FOREIGN KEY ([idUser])
REFERENCES [security].[user]([idUser]);
GO

-- Animal Photo Table
CREATE TABLE [functional].[animalPhoto] (
  [idAnimalPhoto] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idAnimal] INTEGER NOT NULL,
  [url] NVARCHAR(500) NOT NULL,
  [isMain] BIT NOT NULL DEFAULT (0)
);
GO

ALTER TABLE [functional].[animalPhoto]
ADD CONSTRAINT [pkAnimalPhoto] PRIMARY KEY CLUSTERED ([idAnimalPhoto]);
GO

ALTER TABLE [functional].[animalPhoto]
ADD CONSTRAINT [fkAnimalPhoto_Animal] FOREIGN KEY ([idAnimal])
REFERENCES [functional].[animal]([idAnimal]);
GO

-- Donor Request Table
CREATE TABLE [functional].[donorRequest] (
  [idDonorRequest] INTEGER IDENTITY(1, 1) NOT NULL,
  [idAccount] INTEGER NOT NULL,
  [idUser] INTEGER NOT NULL,
  [justification] NVARCHAR(2000) NOT NULL,
  [status] NVARCHAR(50) NOT NULL DEFAULT ('Pendente'),
  [requestDate] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [reviewerId] INTEGER NULL,
  [reviewDate] DATETIME2 NULL,
  [reviewNotes] NVARCHAR(MAX) NULL
);
GO

ALTER TABLE [functional].[donorRequest]
ADD CONSTRAINT [pkDonorRequest] PRIMARY KEY CLUSTERED ([idDonorRequest]);
GO

ALTER TABLE [functional].[donorRequest]
ADD CONSTRAINT [fkDonorRequest_User] FOREIGN KEY ([idUser])
REFERENCES [security].[user]([idUser]);
GO
