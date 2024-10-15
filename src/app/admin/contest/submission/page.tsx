import SubmissionList from '@/components/admin/contest/SubmissionLIst';
import { Suspense } from 'react';

export default function Submission() {
  return (
    <Suspense>
      <SubmissionList />
    </Suspense>
  );
}
