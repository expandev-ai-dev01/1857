import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';

function NotFoundPage() {
  const { goHome } = useNavigation();

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Page not found</p>
      <Button onClick={goHome}>Go Home</Button>
    </div>
  );
}

export { NotFoundPage };
