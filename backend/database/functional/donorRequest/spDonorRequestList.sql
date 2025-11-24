CREATE OR ALTER PROCEDURE [functional].[spDonorRequestList]
  @idAccount INTEGER,
  @status NVARCHAR(50) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  SELECT 
    [dr].*,
    [u].[name] AS [userName],
    [u].[email] AS [userEmail]
  FROM [functional].[donorRequest] [dr]
  JOIN [security].[user] [u] ON [dr].[idUser] = [u].[idUser]
  WHERE [dr].[idAccount] = @idAccount
    AND (@status IS NULL OR [dr].[status] = @status)
  ORDER BY [dr].[requestDate] DESC;
END;
GO
