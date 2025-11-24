import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { MainLayout } from '@/layouts/MainLayout';

const HomePage = lazy(() =>
  import('@/pages/Home').then((module) => ({ default: module.HomePage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((module) => ({ default: module.NotFoundPage }))
);
const CatalogPage = lazy(() =>
  import('@/pages/Catalog').then((module) => ({ default: module.CatalogPage }))
);
const AnimalDetailsPage = lazy(() =>
  import('@/pages/AnimalDetails').then((module) => ({ default: module.AnimalDetailsPage }))
);
const MyAnimalsPage = lazy(() =>
  import('@/pages/Donor/MyAnimals').then((module) => ({ default: module.MyAnimalsPage }))
);
const CreateAnimalPage = lazy(() =>
  import('@/pages/Donor/CreateAnimal').then((module) => ({ default: module.CreateAnimalPage }))
);
const EditAnimalPage = lazy(() =>
  import('@/pages/Donor/EditAnimal').then((module) => ({ default: module.EditAnimalPage }))
);
const DonorRequestPage = lazy(() =>
  import('@/pages/Donor/Request').then((module) => ({ default: module.DonorRequestPage }))
);

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pets',
        element: <CatalogPage />,
      },
      {
        path: 'pets/:id',
        element: <AnimalDetailsPage />,
      },
      {
        path: 'donor/request',
        element: <DonorRequestPage />,
      },
      {
        path: 'donor/animals',
        element: <MyAnimalsPage />,
      },
      {
        path: 'donor/animals/new',
        element: <CreateAnimalPage />,
      },
      {
        path: 'donor/animals/:id/edit',
        element: <EditAnimalPage />,
      },
      {
        path: '*',
        element: (
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export { routes };
