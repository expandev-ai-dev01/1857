CREATE OR ALTER PROCEDURE [functional].[spAnimalUpdate]
  @idAccount INTEGER,
  @idUser INTEGER,
  @idAnimal INTEGER,
  @name NVARCHAR(100),
  @species NVARCHAR(50),
  @breed NVARCHAR(50) = NULL,
  @ageYears INTEGER,
  @ageMonths INTEGER,
  @size NVARCHAR(20),
  @gender NVARCHAR(20),
  @description NVARCHAR(1000),
  @temperament NVARCHAR(MAX) = NULL,
  @healthStatus NVARCHAR(MAX) = NULL,
  @locationCity NVARCHAR(100),
  @locationState NVARCHAR(2),
  @contactInfo NVARCHAR(200),
  @status NVARCHAR(50),
  @photosJson NVARCHAR(MAX) -- JSON Array of URLs
AS
BEGIN
  SET NOCOUNT ON;

  -- Validation: Check ownership
  IF NOT EXISTS (SELECT 1 FROM [functional].[animal] WHERE [idAnimal] = @idAnimal AND [idUser] = @idUser AND [idAccount] = @idAccount)
  BEGIN
    THROW 51000, 'UnauthorizedAccess', 1;
  END;

  BEGIN TRY
    BEGIN TRAN;

    UPDATE [functional].[animal]
    SET 
      [name] = @name,
      [species] = @species,
      [breed] = @breed,
      [ageYears] = @ageYears,
      [ageMonths] = @ageMonths,
      [size] = @size,
      [gender] = @gender,
      [description] = @description,
      [temperament] = @temperament,
      [healthStatus] = @healthStatus,
      [locationCity] = @locationCity,
      [locationState] = @locationState,
      [contactInfo] = @contactInfo,
      [status] = @status,
      [dateModified] = GETUTCDATE()
    WHERE [idAnimal] = @idAnimal AND [idAccount] = @idAccount;

    -- Update Photos (Delete all and re-insert for simplicity in this scope)
    DELETE FROM [functional].[animalPhoto] WHERE [idAnimal] = @idAnimal AND [idAccount] = @idAccount;

    IF @photosJson IS NOT NULL
    BEGIN
      INSERT INTO [functional].[animalPhoto] ([idAccount], [idAnimal], [url], [isMain])
      SELECT 
        @idAccount, 
        @idAnimal, 
        [value], 
        CASE WHEN [key] = 0 THEN 1 ELSE 0 END
      FROM OPENJSON(@photosJson);
    END;

    COMMIT TRAN;

    SELECT * FROM [functional].[animal] WHERE [idAnimal] = @idAnimal;

  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO
