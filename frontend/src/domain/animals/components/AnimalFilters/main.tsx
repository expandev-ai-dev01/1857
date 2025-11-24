import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Label } from '@/core/components/label';
import { Select } from '@/core/components/select';
import type { AnimalFilters } from '../../types';

interface AnimalFiltersProps {
  filters: AnimalFilters;
  onFilterChange: (filters: AnimalFilters) => void;
}

export function AnimalFilters({ filters, onFilterChange }: AnimalFiltersProps) {
  const handleChange = (key: keyof AnimalFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value || undefined, page: 1 });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-2">
        <Label>Espécie</Label>
        <Select
          value={filters.species || ''}
          onChange={(e) => handleChange('species', e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Porte</Label>
        <Select value={filters.size || ''} onChange={(e) => handleChange('size', e.target.value)}>
          <option value="">Todos</option>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Sexo</Label>
        <Select
          value={filters.gender || ''}
          onChange={(e) => handleChange('gender', e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Macho">Macho</option>
          <option value="Fêmea">Fêmea</option>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Faixa Etária</Label>
        <Select
          value={filters.ageGroup || ''}
          onChange={(e) => handleChange('ageGroup', e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Filhote">Filhote</option>
          <option value="Jovem">Jovem</option>
          <option value="Adulto">Adulto</option>
          <option value="Idoso">Idoso</option>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Cidade</Label>
        <Input
          placeholder="Ex: São Paulo"
          value={filters.locationCity || ''}
          onChange={(e) => handleChange('locationCity', e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Estado (UF)</Label>
        <Input
          placeholder="Ex: SP"
          maxLength={2}
          value={filters.locationState || ''}
          onChange={(e) => handleChange('locationState', e.target.value.toUpperCase())}
        />
      </div>
      <div className="flex items-end">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onFilterChange({ page: 1, pageSize: 10 })}
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}
