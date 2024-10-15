import AssignmentList from '@/components/professor/assignment/AssignmentLIst';
import { Suspense } from 'react';

export default function List() {
  return (
    <Suspense>
      <AssignmentList />
    </Suspense>
  );
}
