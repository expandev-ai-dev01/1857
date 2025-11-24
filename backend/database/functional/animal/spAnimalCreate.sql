CREATE OR ALTER PROCEDURE [functional].[spAnimalCreate]
  @idAccount INTEGER,
  @idUser INTEGER,
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
  @photosJson NVARCHAR(MAX) -- JSON Array of URLs
AS
BEGIN
  SET NOCOUNT ON;

  BEGIN TRY
    BEGIN TRAN;

    -- Insert Animal
    DECLARE @idAnimal INTEGER;
    
    INSERT INTO [functional].[animal] (
      [idAccount], [idUser], [name], [species], [breed], 
      [ageYears], [ageMonths], [size], [gender], [description], 
      [temperament], [healthStatus], [locationCity], [locationState], 
      [contactInfo]
    )
    VALUES (
      @idAccount, @idUser, @name, @species, @breed,
      @ageYears, @ageMonths, @size, @gender, @description,
      @temperament, @healthStatus, @locationCity, @locationState,
      @contactInfo
    );

    SET @idAnimal = SCOPE_IDENTITY();

    -- Insert Photos
    IF @photosJson IS NOT NULL
    BEGIN
      INSERT INTO [functional].[animalPhoto] ([idAccount], [idAnimal], [url], [isMain])
      SELECT 
        @idAccount, 
        @idAnimal, 
        [value], 
        CASE WHEN [key] = 0 THEN 1 ELSE 0 END -- First photo is main
      FROM OPENJSON(@photosJson);
    END;

    COMMIT TRAN;

    -- Return created animal
    SELECT * FROM [functional].[animal] WHERE [idAnimal] = @idAnimal;

  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO
