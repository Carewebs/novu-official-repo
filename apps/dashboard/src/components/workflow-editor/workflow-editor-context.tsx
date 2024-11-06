import { createContext } from 'react';
import type { StepTypeEnum } from '@/utils/enums';

export type WorkflowEditorContextType = {
  addStep: (channelType: StepTypeEnum, stepIndex?: number) => void;
  deleteStep: (stepSlug: string) => void;
  isReadOnly: boolean;
};

export const WorkflowEditorContext = createContext<WorkflowEditorContextType>({} as WorkflowEditorContextType);