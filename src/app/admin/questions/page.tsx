import QuestionsList from '@/components/professor/questions/QuestionsList';
import { Suspense } from 'react';

export default function Questions() {
  return (
    <Suspense>
      <QuestionsList />
    </Suspense>
  );
}
