CREATE OR ALTER PROCEDURE [functional].[spAnimalDelete]
  @idAccount INTEGER,
  @idUser INTEGER,
  @idAnimal INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  -- Validation: Check ownership
  IF NOT EXISTS (SELECT 1 FROM [functional].[animal] WHERE [idAnimal] = @idAnimal AND [idUser] = @idUser AND [idAccount] = @idAccount)
  BEGIN
    THROW 51000, 'UnauthorizedAccess', 1;
  END;

  UPDATE [functional].[animal]
  SET 
    [deleted] = 1,
    [status] = 'Inativo',
    [dateModified] = GETUTCDATE()
  WHERE [idAnimal] = @idAnimal AND [idAccount] = @idAccount;

  SELECT 1 AS [success];
END;
GO
