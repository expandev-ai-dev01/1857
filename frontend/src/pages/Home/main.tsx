import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';

function HomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Welcome to Flora</h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          Find your new best friend. Browse pets available for adoption in your area.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" onClick={() => navigate('/pets')}>
          Browse Pets
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate('/about')}>
          Learn More
        </Button>
      </div>
    </div>
  );
}

export { HomePage };
