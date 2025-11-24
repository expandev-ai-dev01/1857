import { useForm, useFieldArray, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { animalSchema } from '../../validations/animalSchema';
import type { AnimalFormData } from '../../types';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import { Label } from '@/core/components/label';
import { Select } from '@/core/components/select';
import { Trash2, Plus } from 'lucide-react';

interface AnimalFormProps {
  defaultValues?: Partial<AnimalFormData>;
  onSubmit: (data: AnimalFormData) => void;
  isLoading?: boolean;
}

export function AnimalForm({ defaultValues, onSubmit, isLoading }: AnimalFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AnimalFormData>({
    resolver: zodResolver(animalSchema) as Resolver<AnimalFormData>,
    defaultValues: defaultValues || {
      ageYears: 0,
      ageMonths: 0,
      healthStatus: [],
      temperament: [],
      photos: [''],
    },
    mode: 'onBlur',
  });

  const {
    fields: photoFields,
    append: appendPhoto,
    remove: removePhoto,
  } = useFieldArray({
    control: control as any,
    name: 'photos',
  });

  const healthOptions = [
    'Vacinado',
    'Vermifugado',
    'Castrado',
    'Microchipado',
    'Necessita de cuidados especiais',
  ];
  const temperamentOptions = [
    'Calmo',
    'Brincalhão',
    'Sociável com cães',
    'Sociável com gatos',
    'Sociável com crianças',
    'Independente',
    'Tímido',
    'Ativo',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" {...register('name')} />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="species">Espécie</Label>
          <Select id="species" {...register('species')}>
            <option value="">Selecione</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </Select>
          {errors.species && <p className="text-sm text-destructive">{errors.species.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="breed">Raça</Label>
          <Input id="breed" {...register('breed')} placeholder="Ex: SRD" />
          {errors.breed && <p className="text-sm text-destructive">{errors.breed.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ageYears">Anos</Label>
            <Input id="ageYears" type="number" min={0} {...register('ageYears')} />
            {errors.ageYears && (
              <p className="text-sm text-destructive">{errors.ageYears.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="ageMonths">Meses</Label>
            <Input id="ageMonths" type="number" min={0} max={11} {...register('ageMonths')} />
            {errors.ageMonths && (
              <p className="text-sm text-destructive">{errors.ageMonths.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Porte</Label>
          <Select id="size" {...register('size')}>
            <option value="">Selecione</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </Select>
          {errors.size && <p className="text-sm text-destructive">{errors.size.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Sexo</Label>
          <Select id="gender" {...register('gender')}>
            <option value="">Selecione</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </Select>
          {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" {...register('description')} />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Saúde</Label>
          <div className="grid grid-cols-2 gap-2">
            {healthOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('healthStatus')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
          {errors.healthStatus && (
            <p className="text-sm text-destructive">{errors.healthStatus.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Temperamento</Label>
          <div className="grid grid-cols-2 gap-2">
            {temperamentOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  {...register('temperament')}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="locationCity">Cidade</Label>
          <Input id="locationCity" {...register('locationCity')} />
          {errors.locationCity && (
            <p className="text-sm text-destructive">{errors.locationCity.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="locationState">Estado (UF)</Label>
          <Input id="locationState" maxLength={2} {...register('locationState')} />
          {errors.locationState && (
            <p className="text-sm text-destructive">{errors.locationState.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contato</Label>
        <Input
          id="contactInfo"
          {...register('contactInfo')}
          placeholder="(00) 00000-0000 ou email@exemplo.com"
        />
        {errors.contactInfo && (
          <p className="text-sm text-destructive">{errors.contactInfo.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Fotos (URLs)</Label>
        {photoFields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input {...register(`photos.${index}` as const)} placeholder="https://..." />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removePhoto(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendPhoto('')}
          disabled={photoFields.length >= 5}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Foto
        </Button>
        {errors.photos && <p className="text-sm text-destructive">{errors.photos.message}</p>}
      </div>

      {defaultValues?.status && (
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select id="status" {...register('status')}>
            <option value="Disponível">Disponível</option>
            <option value="Em processo de adoção">Em processo de adoção</option>
            <option value="Adotado">Adotado</option>
            <option value="Inativo">Inativo</option>
          </Select>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Animal'}
        </Button>
      </div>
    </form>
  );
}
