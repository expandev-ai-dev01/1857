import { useMyAnimals } from '@/domain/animals/hooks/useMyAnimals';
import { useAnimalMutations } from '@/domain/animals/hooks/useAnimalMutations';
import { Button } from '@/core/components/button';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { useNavigation } from '@/core/hooks/useNavigation';
import { Plus, Edit, Trash2 } from 'lucide-react';

function MyAnimalsPage() {
  const { data: animals, isLoading } = useMyAnimals();
  const { deleteMutation } = useAnimalMutations();
  const { navigate } = useNavigation();

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este animal?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meus Animais</h1>
        <Button onClick={() => navigate('/donor/animals/new')}>
          <Plus className="mr-2 h-4 w-4" /> Cadastrar Animal
        </Button>
      </div>

      {animals?.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground mb-4">Você ainda não cadastrou nenhum animal.</p>
          <Button variant="outline" onClick={() => navigate('/donor/animals/new')}>
            Começar agora
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {animals?.map((animal) => (
            <Card key={animal.id} className="flex flex-col">
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={animal.photos[0]}
                  alt={animal.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>{animal.name}</CardTitle>
                  <Badge variant={animal.status === 'Disponível' ? 'default' : 'secondary'}>
                    {animal.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">{animal.description}</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/donor/animals/${animal.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(animal.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export { MyAnimalsPage };
