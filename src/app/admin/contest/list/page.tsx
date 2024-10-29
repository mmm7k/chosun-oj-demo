import ContestList from '@/components/admin/contest/ContestList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <ContestList />
    </Suspense>
  );
}
