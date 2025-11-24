import { useParams } from 'react-router-dom';
import { useAnimalDetails } from '@/domain/animals/hooks/useAnimalDetails';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Badge } from '@/core/components/badge';
import { Button } from '@/core/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { useNavigation } from '@/core/hooks/useNavigation';
import { MapPin, Phone, Heart, Info } from 'lucide-react';

function AnimalDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: animal, isLoading, isError } = useAnimalDetails(Number(id));
  const { goBack } = useNavigation();

  if (isLoading)
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  if (isError || !animal)
    return <div className="text-center py-12">Animal não encontrado ou indisponível.</div>;

  const formatAge = (years: number, months: number) => {
    if (years > 0 && months > 0) return `${years} anos e ${months} meses`;
    if (years > 0) return `${years} anos`;
    return `${months} meses`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button variant="ghost" onClick={goBack} className="mb-4">
        &larr; Voltar
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
            <img src={animal.photos[0]} alt={animal.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {animal.photos.slice(1).map((photo, idx) => (
              <div key={idx} className="aspect-square overflow-hidden rounded-md border bg-muted">
                <img
                  src={photo}
                  alt={`${animal.name} ${idx + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-primary">{animal.name}</h1>
              <Badge className="text-lg px-3 py-1">{animal.status}</Badge>
            </div>
            <div className="flex items-center text-muted-foreground mt-2">
              <MapPin className="mr-2 h-4 w-4" />
              {animal.locationCity}, {animal.locationState}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{animal.species}</Badge>
            <Badge variant="outline">{animal.breed || 'SRD'}</Badge>
            <Badge variant="outline">{animal.gender}</Badge>
            <Badge variant="outline">{animal.size}</Badge>
            <Badge variant="outline">{formatAge(animal.ageYears, animal.ageMonths)}</Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" /> Sobre
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{animal.description}</p>

              <div>
                <h4 className="font-semibold mb-2">Temperamento</h4>
                <div className="flex flex-wrap gap-1">
                  {animal.temperament?.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Saúde</h4>
                <div className="flex flex-wrap gap-1">
                  {animal.healthStatus.map((h) => (
                    <Badge
                      key={h}
                      variant="outline"
                      className="text-xs border-green-200 bg-green-50 text-green-700"
                    >
                      {h}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" /> Quero Adotar!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Entre em contato diretamente com o doador para iniciar o processo.
              </p>
              <div className="flex items-center gap-2 font-medium text-lg">
                <Phone className="h-5 w-5" />
                {animal.contactInfo}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { AnimalDetailsPage };
