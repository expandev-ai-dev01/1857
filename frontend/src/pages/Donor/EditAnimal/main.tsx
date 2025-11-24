import { useParams } from 'react-router-dom';
import { AnimalForm } from '@/domain/animals/components/AnimalForm';
import { useAnimalDetails } from '@/domain/animals/hooks/useAnimalDetails';
import { useAnimalMutations } from '@/domain/animals/hooks/useAnimalMutations';
import { useNavigation } from '@/core/hooks/useNavigation';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import type { AnimalFormData } from '@/domain/animals/types';

function EditAnimalPage() {
  const { id } = useParams<{ id: string }>();
  const { data: animal, isLoading } = useAnimalDetails(Number(id));
  const { updateMutation } = useAnimalMutations();
  const { navigate, goBack } = useNavigation();

  const handleSubmit = async (data: AnimalFormData) => {
    try {
      await updateMutation.mutateAsync({ id: Number(id), data });
      navigate('/donor/animals');
    } catch (error) {
      console.error('Failed to update animal', error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  if (!animal) return <div>Animal não encontrado</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editar Animal</h1>
        <button onClick={goBack} className="text-sm text-muted-foreground hover:underline">
          Cancelar
        </button>
      </div>
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <AnimalForm
          defaultValues={animal}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
        />
      </div>
    </div>
  );
}

export { EditAnimalPage };
