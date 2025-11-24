import { AnimalForm } from '@/domain/animals/components/AnimalForm';
import { useAnimalMutations } from '@/domain/animals/hooks/useAnimalMutations';
import { useNavigation } from '@/core/hooks/useNavigation';
import type { AnimalFormData } from '@/domain/animals/types';

function CreateAnimalPage() {
  const { createMutation } = useAnimalMutations();
  const { navigate, goBack } = useNavigation();

  const handleSubmit = async (data: AnimalFormData) => {
    try {
      await createMutation.mutateAsync(data);
      navigate('/donor/animals');
    } catch (error) {
      console.error('Failed to create animal', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cadastrar Novo Animal</h1>
        <button onClick={goBack} className="text-sm text-muted-foreground hover:underline">
          Cancelar
        </button>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <AnimalForm onSubmit={handleSubmit} isLoading={createMutation.isPending} />
      </div>
    </div>
  );
}

export { CreateAnimalPage };
