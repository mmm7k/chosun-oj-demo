import SubmissionList from '@/components/professor/assignment/SubmissionLIst';
import { Suspense } from 'react';

export default function Submission() {
  return (
    <Suspense>
      <SubmissionList />
    </Suspense>
  );
}
