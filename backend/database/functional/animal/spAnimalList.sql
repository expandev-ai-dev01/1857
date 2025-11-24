CREATE OR ALTER PROCEDURE [functional].[spAnimalList]
  @idAccount INTEGER,
  @species NVARCHAR(50) = NULL,
  @size NVARCHAR(20) = NULL,
  @gender NVARCHAR(20) = NULL,
  @locationCity NVARCHAR(100) = NULL,
  @locationState NVARCHAR(2) = NULL,
  @ageGroup NVARCHAR(20) = NULL, -- 'Filhote', 'Jovem', 'Adulto', 'Idoso'
  @page INTEGER = 1,
  @pageSize INTEGER = 20
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @offset INTEGER = (@page - 1) * @pageSize;

  -- Calculate total months for age filtering
  -- Filhote: <= 12 months
  -- Jovem: > 12 AND <= 36 months
  -- Adulto: > 36 AND <= 96 months
  -- Idoso: > 96 months

  SELECT 
    [a].[idAnimal],
    [a].[name],
    [a].[species],
    [a].[breed],
    [a].[ageYears],
    [a].[ageMonths],
    [a].[size],
    [a].[gender],
    [a].[locationCity],
    [a].[locationState],
    [a].[dateCreated],
    (SELECT TOP 1 [url] FROM [functional].[animalPhoto] WHERE [idAnimal] = [a].[idAnimal] AND [isMain] = 1) AS [mainPhoto],
    COUNT(*) OVER() AS [total]
  FROM [functional].[animal] [a]
  WHERE [a].[idAccount] = @idAccount
    AND [a].[deleted] = 0
    AND [a].[status] = 'Disponível'
    AND (@species IS NULL OR [a].[species] = @species)
    AND (@size IS NULL OR [a].[size] = @size)
    AND (@gender IS NULL OR [a].[gender] = @gender)
    AND (@locationCity IS NULL OR [a].[locationCity] LIKE '%' + @locationCity + '%')
    AND (@locationState IS NULL OR [a].[locationState] = @locationState)
    AND (
      @ageGroup IS NULL OR
      (@ageGroup = 'Filhote' AND ([a].[ageYears] * 12 + [a].[ageMonths]) <= 12) OR
      (@ageGroup = 'Jovem' AND ([a].[ageYears] * 12 + [a].[ageMonths]) > 12 AND ([a].[ageYears] * 12 + [a].[ageMonths]) <= 36) OR
      (@ageGroup = 'Adulto' AND ([a].[ageYears] * 12 + [a].[ageMonths]) > 36 AND ([a].[ageYears] * 12 + [a].[ageMonths]) <= 96) OR
      (@ageGroup = 'Idoso' AND ([a].[ageYears] * 12 + [a].[ageMonths]) > 96)
    )
  ORDER BY [a].[dateCreated] DESC
  OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY;
END;
GO
