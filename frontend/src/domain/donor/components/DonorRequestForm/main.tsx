import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { donorRequestSchema } from '../../validations/donorSchema';
import type { DonorRequestFormData } from '../../types';
import { Button } from '@/core/components/button';
import { Textarea } from '@/core/components/textarea';
import { Label } from '@/core/components/label';

interface DonorRequestFormProps {
  onSubmit: (data: DonorRequestFormData) => void;
  isLoading?: boolean;
}

export function DonorRequestForm({ onSubmit, isLoading }: DonorRequestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorRequestFormData>({
    resolver: zodResolver(donorRequestSchema),
    mode: 'onBlur',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="justification">Justificativa</Label>
        <Textarea
          id="justification"
          {...register('justification')}
          placeholder="Conte-nos por que você deseja se tornar um doador..."
          className="min-h-[200px]"
        />
        {errors.justification && (
          <p className="text-sm text-destructive">{errors.justification.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          Mínimo de 100 caracteres. Explique sua experiência com animais ou vínculo com ONGs.
        </p>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
      </Button>
    </form>
  );
}
