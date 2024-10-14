import ProblemList from '@/components/professor/problems/list/ProblemList';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <ProblemList />
    </Suspense>
  );
}
