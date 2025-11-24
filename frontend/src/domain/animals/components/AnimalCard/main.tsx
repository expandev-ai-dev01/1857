import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Button } from '@/core/components/button';
import { MapPin } from 'lucide-react';
import type { Animal } from '../../types';
import { useNavigation } from '@/core/hooks/useNavigation';

interface AnimalCardProps {
  animal: Animal;
}

export function AnimalCard({ animal }: AnimalCardProps) {
  const { navigate } = useNavigation();

  const formatAge = (years: number, months: number) => {
    if (years > 0 && months > 0) return `${years} anos e ${months} meses`;
    if (years > 0) return `${years} anos`;
    return `${months} meses`;
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="aspect-square w-full overflow-hidden bg-muted">
        <img
          src={animal.photos[0]}
          alt={animal.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{animal.name}</CardTitle>
          <Badge variant="secondary">{animal.species}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="mr-1 h-3 w-3" />
          {animal.locationCity}, {animal.locationState}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-1">
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="outline">{animal.gender}</Badge>
          <Badge variant="outline">{animal.size}</Badge>
          <Badge variant="outline">{formatAge(animal.ageYears, animal.ageMonths)}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full" onClick={() => navigate(`/pets/${animal.id}`)}>
          Ver Detalhes
        </Button>
      </CardFooter>
    </Card>
  );
}
