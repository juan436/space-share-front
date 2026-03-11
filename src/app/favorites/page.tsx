import { Metadata } from 'next';
import { FavoritesPage } from '@/presentation/features/favorites/FavoritesPage';

export const metadata: Metadata = {
  title: 'Guardados | SpaceShare',
  description: 'Revisa y gestiona tus espacios de alquiler guardados en SpaceShare.',
};

export default function FavoritesRoute() {
  return <FavoritesPage />;
}
