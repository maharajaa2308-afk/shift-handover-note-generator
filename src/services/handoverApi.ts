import type { ShiftData } from '@/types';
import { sampleShiftData } from '@/data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const USE_MOCK_DATA = !API_BASE_URL;

export interface GenerateHandoverParams {
  shiftStart: string;
  shiftEnd: string;
}

export async function generateHandoverNote(
  params: GenerateHandoverParams
): Promise<ShiftData> {
  if (USE_MOCK_DATA) {
    return mockGenerate(params);
  }

  const response = await fetch(`${API_BASE_URL}/api/handover/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const message = `Handover generation failed: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return (await response.json()) as ShiftData;
}

function mockGenerate(params: GenerateHandoverParams): Promise<ShiftData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...sampleShiftData,
        shiftStart: params.shiftStart,
        shiftEnd: params.shiftEnd,
        generatedAt: new Date().toISOString(),
      });
    }, 1200);
  });
}
