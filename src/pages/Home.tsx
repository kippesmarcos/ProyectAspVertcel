import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Store } from '@/components/Store';

export function Home() {
  return (
    <MainLayout>
      <Hero />
      <Stats />
      <Store />
    </MainLayout>
  );
}