import { UnitSelectionContainer } from '../../../components/learning/UnitSelectionContainer';

export default async function MathPage({
  params,
}: {
  params: Promise<{ unitId: string }>;
}) {
  const { unitId } = await params;
  return <UnitSelectionContainer unitId={unitId} />;
}
