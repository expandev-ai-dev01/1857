CREATE OR ALTER PROCEDURE [functional].[spDonorRequestUpdate]
  @idAccount INTEGER,
  @idDonorRequest INTEGER,
  @reviewerId INTEGER,
  @status NVARCHAR(50), -- 'Aprovado', 'Rejeitado'
  @reviewNotes NVARCHAR(MAX) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  BEGIN TRY
    BEGIN TRAN;

    DECLARE @idUser INTEGER;
    SELECT @idUser = [idUser] FROM [functional].[donorRequest] WHERE [idDonorRequest] = @idDonorRequest;

    UPDATE [functional].[donorRequest]
    SET 
      [status] = @status,
      [reviewerId] = @reviewerId,
      [reviewDate] = GETUTCDATE(),
      [reviewNotes] = @reviewNotes
    WHERE [idDonorRequest] = @idDonorRequest AND [idAccount] = @idAccount;

    IF @status = 'Aprovado'
    BEGIN
      UPDATE [security].[user]
      SET [role] = 'Donor'
      WHERE [idUser] = @idUser AND [idAccount] = @idAccount;
    END;

    COMMIT TRAN;

    SELECT * FROM [functional].[donorRequest] WHERE [idDonorRequest] = @idDonorRequest;

  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO
