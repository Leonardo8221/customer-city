import React, { useState, useEffect, createContext } from 'react';
import { Product } from 'store/product/types';
import { User } from 'store/user/types';
import { apiCall } from 'http/index';
import { client, baseURL } from 'http/api-client';

export interface DealStage {
  dealStageId: number;
  dealStageName: string;
  dealStageDescription: string;
}

export interface ContactStage {
  contactStageId: number;
  contactStageName: string;
  contactStageDescription: string;
}

export interface BaseStage {
  type: 'Pre-Sales' | 'Sales' | 'Post-Sales';
  baseStageId: number;
  title: string;
  description: string;
}

export interface PipelineStage extends BaseStage {
  createdAt?: Date;
  pipelineStageName?: string;
  pipelineStageDescription?: string;
  pipelineStageOwners?: User[];
  pipelineStageCategory?: string;
  baseStage?: BaseStage;
}

// type PipelineStage = {
//     type: 'Pre-Sales' | 'Sales' | 'Post-Sales',
//     systemPipelineStage: DealStage | ContactStage,
//     pipelineStageId: number,
//     name: string,
//     goal?: string
//     owners?: User[],
//     forcastCategory?: number,
//     document?: PipelineDocument[]
// }

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
  pipelineStage: PipelineStage[];
  pipelineDocument: PipelineDocument[];
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
  pipelineStage: [],
  pipelineDocument: [],
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

type PipelinesContextProps = {
  pipelines: FetchPipeline[];
  baseStages: BaseStage[];
  createPipeline: (newPipeline: Pipeline) => void;
  setEditPipeline: (pipelineId: number | null) => void;
  editPipeline: number | null;
};

type FetchPipeline = Pipeline & {
  pipelineId: number;
};

export const PipelinesContext = React.createContext<undefined | PipelinesContextProps>(undefined);

export default function PipelinesProvider(props: { children: JSX.Element[] }) {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);

  const [pipelines, setPipelines] = useState<FetchPipeline[]>([]);
  const [baseStages, setBaseStages] = useState<BaseStage[]>([]);
  const [editPipeline, setEditPipeline] = useState<number | null>(null);

  const createPipeline = (newPipeline: Pipeline) => {
    if (editPipeline) {
      updatePipeline(editPipeline, newPipeline).then((data: FetchPipeline) => {
        setPipelines([...pipelines, data]);
      });
      return;
    }
    createNewPipeline(newPipeline).then((data: FetchPipeline) => {
      setPipelines([...pipelines, data]);
    });
  };

  //   const fetch = getAllPipelines;

  useEffect(() => {
    getAllPipelines().then((data: FetchPipeline[]) => {
      setPipelines(data);
    });

    getAllBaseStages().then((data: BaseStage[]) => {
      setBaseStages(data);
    });
  }, []);

  return (
    <PipelinesContext.Provider
      value={{
        pipelines,
        baseStages,
        createPipeline,
        setEditPipeline,
        editPipeline,
      }}
    >
      {props.children}
    </PipelinesContext.Provider>
  );
}

export function usePipelines() {
  const context = React.useContext(PipelinesContext);

  if (!context) {
    throw new Error('usePipelineStagesContext must be used within PipelinesProvider');
  }

  return context;
}

async function getAllPipelines() {
  return apiCall<FetchPipeline[]>({ method: 'GET', url: '/pipeline' });
}

async function getAllBaseStages() {
  return apiCall<BaseStage[]>({ method: 'GET', url: '/basestage' });
}

async function createNewPipeline(data: Pipeline) {
  return apiCall<FetchPipeline>({ method: 'POST', url: '/pipeline', data });
}

async function updatePipeline(id: number, data: Pipeline) {
  return apiCall<FetchPipeline>({ method: 'POST', url: `/pipeline/${id}`, data });
}

async function deletePipeline(id: number) {
  return apiCall<boolean>({ method: 'DELETE', url: `/pipeline/${id}` });
}
