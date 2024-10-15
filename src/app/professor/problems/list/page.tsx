import ProblemList from '@/components/professor/problems/ProblemList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <ProblemList />
    </Suspense>
  );
}
