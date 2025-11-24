CREATE OR ALTER PROCEDURE [functional].[spAnimalGet]
  @idAccount INTEGER,
  @idAnimal INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  -- Result Set 1: Animal Details
  SELECT 
    [a].*,
    [u].[name] AS [donorName]
  FROM [functional].[animal] [a]
  JOIN [security].[user] [u] ON [a].[idUser] = [u].[idUser]
  WHERE [a].[idAnimal] = @idAnimal 
    AND [a].[idAccount] = @idAccount
    AND ([a].[deleted] = 0 OR [a].[status] = 'Inativo'); -- Allow viewing if inactive but not hard deleted

  -- Result Set 2: Photos
  SELECT [url], [isMain]
  FROM [functional].[animalPhoto]
  WHERE [idAnimal] = @idAnimal AND [idAccount] = @idAccount
  ORDER BY [isMain] DESC;
END;
GO
