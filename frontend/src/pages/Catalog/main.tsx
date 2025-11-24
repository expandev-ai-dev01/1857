import { useState } from 'react';
import { useAnimalList } from '@/domain/animals/hooks/useAnimalList';
import { AnimalCard } from '@/domain/animals/components/AnimalCard';
import { AnimalFilters } from '@/domain/animals/components/AnimalFilters';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Button } from '@/core/components/button';
import type { AnimalFilters as FilterType } from '@/domain/animals/types';

function CatalogPage() {
  const [filters, setFilters] = useState<FilterType>({ page: 1, pageSize: 12 });
  const { data, isLoading, isError } = useAnimalList(filters);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isError) {
    return (
      <div className="text-center text-destructive">Erro ao carregar animais. Tente novamente.</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Adote um Amigo</h1>
        <p className="text-muted-foreground">
          Explore nosso catálogo e encontre seu novo companheiro.
        </p>
      </div>

      <AnimalFilters filters={filters} onFilterChange={handleFilterChange} />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {data?.data.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum animal encontrado com os filtros selecionados.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.data.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          )}

          {data && data.total > data.pageSize && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => handlePageChange((filters.page || 1) - 1)}
                disabled={filters.page === 1}
              >
                Anterior
              </Button>
              <span className="flex items-center px-4 text-sm">
                Página {filters.page} de {Math.ceil(data.total / data.pageSize)}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange((filters.page || 1) + 1)}
                disabled={filters.page === Math.ceil(data.total / data.pageSize)}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { CatalogPage };
