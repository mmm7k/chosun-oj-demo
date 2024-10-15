import ContestList from '@/components/professor/contest/ContestList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <ContestList />
    </Suspense>
  );
}
