import React, { useState, useEffect, createContext } from 'react';
import { User } from 'store/user/types';
import { apiCall } from 'http/index';
import { client, baseURL } from 'http/api-client';
import { useAsync } from 'utils/async';
import { Loader } from 'components/Loader';
import { useProducts, Product } from 'providers/ProductsProvider';
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

export interface PipelineProduct {
  pipelineId?: number;
  productId?: number;
}
export interface PipelineStage extends BaseStage {
  createdAt?: Date;
  pipelineStageName?: string;
  pipelineStageDescription?: string;
  pipelineStageOwners?: User[];
  pipelineStageCategory?: string;
  baseStage?: BaseStage;
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
  products: Product[];
  pipelineUsers: User[];
  // pipelineProducts: PipelineProduct[]
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
  products: [],
  pipelineUsers: [],
  // pipelineProducts: []
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
  deletePipeline: (id: number) => void;
};

type FetchPipeline = Pipeline & {
  pipelineId: number;
};

export const PipelinesContext = React.createContext<undefined | PipelinesContextProps>(undefined);

export default function PipelinesProvider(props: { children: JSX.Element | JSX.Element[] }) {
  // const [stages, setStages] = useState<PipelineStage[]>([]);
  // const [loading, setLoading] = useState(true);

  const [pipelines, setPipelines] = useState<FetchPipeline[]>([]);
  const [baseStages, setBaseStages] = useState<BaseStage[]>([]);
  const [editPipeline, setEditPipeline] = useState<number | null>(null);

  const { data: savedPipelines, loading } = useAsync(getAllPipelines);
  const { data: savedBaseSages, loading: looadingBaseStages } = useAsync(getAllBaseStages);

  const { products: savedProducts } = useProducts();

  useEffect(() => {
    if (!savedPipelines) {
      return;
    }

    const saved = savedPipelines.map((pipeline) => {
      const { pipelineProducts, ...others } = pipeline;
      const products = pipelineProducts.map((p) => {
        return savedProducts.filter((s) => s.productId === p.productId)[0];
      });

      const newPipeline: FetchPipeline = {
        ...others,
        products,
      };

      return newPipeline;
    });
    setPipelines(saved);
  }, [savedPipelines, savedProducts]);

  useEffect(() => {
    if (!savedBaseSages) {
      return;
    }
    setBaseStages(savedBaseSages);
  }, [savedBaseSages]);

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
    window.location.reload();
  };

  const remove = (id: number) => {
    deletePipeline(id).then(() => {
      const removed = pipelines.filter((p) => p.pipelineId !== id);
      setPipelines(removed);
    });
    window.location.reload();
  };

  if (looadingBaseStages || loading) {
    return <Loader />;
  }

  return (
    <PipelinesContext.Provider
      value={{
        pipelines,
        baseStages,
        createPipeline,
        setEditPipeline,
        editPipeline,
        deletePipeline: remove,
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

type Fetched = FetchPipeline & {
  pipelineProducts: PipelineProduct[];
};

async function getAllPipelines() {
  return apiCall<Fetched[]>({ method: 'GET', url: '/pipeline' });
}

async function getAllBaseStages() {
  return apiCall<BaseStage[]>({ method: 'GET', url: '/basestage' });
}

async function createNewPipeline(data: Pipeline) {
  const { products, ...others } = data;
  const pipelineProducts = products.map((p) => {
    return {
      productId: p.productId,
    };
  });
  const d1 = { ...others, pipelineProducts };
  return apiCall<FetchPipeline>({ method: 'POST', url: '/pipeline', data: d1 });
}

async function updatePipeline(id: number, data: Pipeline) {
  const { products, ...others } = data;
  const pipelineProducts = products.map((p) => {
    return {
      productId: p.productId,
    };
  });
  const d1 = { ...others, pipelineProducts };

  return apiCall<FetchPipeline>({ method: 'PUT', url: `/pipeline/${id}`, data: d1 });
}

async function deletePipeline(id: number) {
  return apiCall<boolean>({ method: 'DELETE', url: `/pipeline/${id}` });
}
