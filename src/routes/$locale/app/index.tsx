import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locale/app/')({
  component: AppIndex,
});

function AppIndex() {
  return <>HELICOPTER HELICOPTER</>;
}
