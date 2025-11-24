CREATE OR ALTER PROCEDURE [functional].[spDonorRequestCreate]
  @idAccount INTEGER,
  @idUser INTEGER,
  @justification NVARCHAR(2000)
AS
BEGIN
  SET NOCOUNT ON;

  -- Check if pending request exists
  IF EXISTS (SELECT 1 FROM [functional].[donorRequest] WHERE [idUser] = @idUser AND [status] = 'Pendente')
  BEGIN
    THROW 51000, 'PendingRequestExists', 1;
  END;

  INSERT INTO [functional].[donorRequest] ([idAccount], [idUser], [justification])
  VALUES (@idAccount, @idUser, @justification);

  SELECT * FROM [functional].[donorRequest] WHERE [idDonorRequest] = SCOPE_IDENTITY();
END;
GO
