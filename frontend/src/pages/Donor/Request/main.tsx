import { DonorRequestForm } from '@/domain/donor/components/DonorRequestForm';
import { useDonorRequest } from '@/domain/donor/hooks/useDonorRequest';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { DonorRequestFormData } from '@/domain/donor/types';

function DonorRequestPage() {
  const { mutateAsync, isPending, isSuccess } = useDonorRequest();
  const { goHome } = useNavigation();

  const handleSubmit = async (data: DonorRequestFormData) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error('Failed to submit request', error);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-12">
        <div className="text-4xl">🎉</div>
        <h1 className="text-2xl font-bold">Solicitação Enviada!</h1>
        <p className="text-muted-foreground">
          Sua solicitação para se tornar um doador foi enviada com sucesso. Nossa equipe analisará
          seu pedido e você receberá um e-mail em breve.
        </p>
        <button onClick={goHome} className="text-primary hover:underline">
          Voltar para a Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Seja um Doador</h1>
        <p className="text-muted-foreground">
          Ajude-nos a encontrar lares para mais animais. Conte-nos um pouco sobre você ou sua
          organização.
        </p>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <DonorRequestForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  );
}

export { DonorRequestPage };
