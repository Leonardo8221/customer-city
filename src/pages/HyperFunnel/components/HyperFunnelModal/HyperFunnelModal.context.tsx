import { createContext } from 'react';
import { DealStage } from 'store/dealStage/types';
import { Product } from 'store/product/types';
import { User } from 'store/user/types';

export interface PipelineStage extends DealStage {
  createdAt?: Date;
  pipelineStageName?: string;
  pipelineStageDescription?: string;
  pipelineStageOwners?: User[];
  pipelineStageCategory?: string;
}

export type PipelineDocument = {
  type: 'document' | 'link';
  location: string;
  size?: number;
  name?: string;
  fileKey?: string;
  extention?: string;
};

export type Pipeline = {
  pipelineName: string;
  pipelineDescription: string;
  pipelineStages: PipelineStage[];
  pipelineDocuments: PipelineDocument[];
  pipelineProducts: Product[];
  pipelineOwners: User[];
};

export enum PipelineFormSteps {
  FIRST,
  SECOND,
  SECOND_DOCUMENTS,
  SECOND_OWNERS,
  SECOND_PRODUCTS,
  THIRD,
}
export const defaultValues: Pipeline = {
  pipelineName: '',
  pipelineDescription: '',
  pipelineStages: [],
  pipelineDocuments: [],
  pipelineProducts: [],
  pipelineOwners: [],
};
export const PipelineFormContext = createContext<{
  form: Pipeline;
  // update: (name: string, value: any) => void;
  step: number;
  setStep: (step: number) => void;
  onClose: () => void;
}>({
  form: defaultValues,
  // update: () => {},
  step: PipelineFormSteps.FIRST,
  setStep: console.log,
  onClose: console.log,
});
