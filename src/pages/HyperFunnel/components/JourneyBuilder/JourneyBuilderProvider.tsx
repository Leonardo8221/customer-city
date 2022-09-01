import React, { useState, useEffect } from 'react';
import { apiCall } from 'http/index';
import { useAsync } from 'utils/async';
import { Loader } from 'components/Loader';
import { Pipeline, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';

export const dateTypes = ['Text', 'Record', 'Number', 'Currency', 'Boolean'];

export type Resource = {
  id: number;
  type: string;
  name: string;
  description: string;
  dateType: 'Text' | 'Record' | 'Number' | 'Currency' | 'Boolean';
};

type JourneyBuilderContextProps = {
  pipeline: Pipeline;
  resources: Resource[];
  createResource: (newResource: Resource) => void;
  removeResource: (resourceId: number) => void;
  updateResource: (resourceId: number, newResource: Resource) => void;
};

export const JourneyBuilderContext = React.createContext<undefined | JourneyBuilderContextProps>(undefined);

export default function JourneyBuilderProvider(props: { children: JSX.Element | JSX.Element[]; pipelineId: number }) {
  const { children, pipelineId } = props;
  const { pipelines } = usePipelines();
  const [resources, setResources] = useState<Resource[]>([]);

  const { data: savedResources, loading } = useAsync(getAllResources);

  const pipeline = pipelines.filter((p) => p.pipelineId === pipelineId)[0];

  useEffect(() => {
    if (!savedResources) {
      return;
    }
    setResources(savedResources);
  }, [savedResources]);

  if (!pipeline) {
    return <div>No Pipelline Configured.</div>;
  }

  if (loading) {
    return <Loader />;
  }

  const createResource = (newResource: Resource) => {
    createNewResource(newResource).then((d) => {
      setResources([...resources, d]);
    });
  };
  const removeResource = (resourceId: number) => {
    deleteResource(resourceId).then(() => {
      const filtered = resources.filter((r) => r.id !== resourceId);
      setResources(filtered);
    });
  };
  const updateR = (resourceId: number, newResource: Resource) => {
    updateResource(resourceId, newResource).then(() => {
      const updated = resources.map((r) => {
        if (r.id === resourceId) {
          return newResource;
        }
        return r;
      });
      setResources(updated);
    });
  };
  return (
    <JourneyBuilderContext.Provider
      value={{
        createResource,
        removeResource,
        updateResource: updateR,
        resources,
        pipeline,
      }}
    >
      {children}
    </JourneyBuilderContext.Provider>
  );
}

export function useJourneyBuilder() {
  const context = React.useContext(JourneyBuilderContext);

  if (!context) {
    throw new Error('useJourneyBuilder must be used within JourneyBuilderProvider');
  }

  return context;
}

async function getAllResources() {
  return apiCall<Resource[]>({ method: 'GET', url: '/resource' });
}

async function createNewResource(data: Resource) {
  return apiCall<Resource>({ method: 'POST', url: '/resource', data });
}

async function updateResource(id: number, data: Resource) {
  return apiCall<Resource>({ method: 'PUT', url: `/resource/${id}`, data });
}

async function deleteResource(id: number) {
  return apiCall<boolean>({ method: 'DELETE', url: `/resource/${id}` });
}
