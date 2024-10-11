import MyProblemList from '@/components/professor/problems/mylist/MyProblemList';
import { Suspense } from 'react';

export default function MyList() {
  return (
    <Suspense>
      <MyProblemList />
    </Suspense>
  );
}
