CREATE OR ALTER PROCEDURE [functional].[spAnimalListByDonor]
  @idAccount INTEGER,
  @idUser INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  SELECT 
    [a].[idAnimal],
    [a].[name],
    [a].[species],
    [a].[status],
    [a].[dateCreated],
    (SELECT TOP 1 [url] FROM [functional].[animalPhoto] WHERE [idAnimal] = [a].[idAnimal] AND [isMain] = 1) AS [mainPhoto]
  FROM [functional].[animal] [a]
  WHERE [a].[idAccount] = @idAccount
    AND [a].[idUser] = @idUser
    AND [a].[deleted] = 0
  ORDER BY [a].[dateCreated] DESC;
END;
GO
