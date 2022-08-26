import { FC, useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import { Modal } from 'components/ui';
import FirstPage from './pages/First';
import SecondPage from './pages/Second';
import Documents from './pages/Documents';
import ThirdPage from './pages/Third';
import { Form, Formik } from 'formik';
import { PipelineFormContext, PipelineFormSteps, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import { useDealStage } from 'store/dealStage/hooks';
import TeamUsersPage from './pages/TeamUsers';
import ProductsPage from './pages/Products';
import { useUser } from 'store/user/hooks';
import { useProducts } from 'providers/ProductsProvider';

interface ProductModalProps {
  open: boolean;
  toggleOpen: () => void;
}

const validationSchema = yup.object({
  dealStageName: yup.string().required('Required'),
});

const HyperFunnelModal: FC<ProductModalProps> = ({ open, toggleOpen }) => {
  const { form } = useContext(PipelineFormContext);
  const [step, setStep] = useState<number>(PipelineFormSteps.FIRST);

  const { pipelines, editPipeline, setEditPipeline } = usePipelines();

  const editPipelineFormData = () => {
    if (!editPipeline) {
      return form;
    }
    const filtered = pipelines.filter((p) => p.pipelineId === editPipeline)[0];
    return filtered;
  };

  // const { getDealStages } = useDealStage();
  // const { getUsers } = useUser();
  // const { products } = useProducts();

  const submit = (values: any) => {
    console.log('submit data: ', values);
  };

  const onClose = () => {
    setStep(PipelineFormSteps.FIRST);
    setEditPipeline(null);
    toggleOpen();
  };

  return (
    <PipelineFormContext.Provider value={{ form: editPipelineFormData(), onClose: toggleOpen, step, setStep }}>
      <Modal open={open} onClose={onClose}>
        <Formik
          initialValues={editPipelineFormData()}
          onSubmit={submit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          <Form>
            {step === PipelineFormSteps.FIRST && <FirstPage />}
            {step === PipelineFormSteps.SECOND && <SecondPage />}
            {step === PipelineFormSteps.SECOND_DOCUMENTS && <Documents />}
            {step === PipelineFormSteps.SECOND_OWNERS && <TeamUsersPage />}
            {step === PipelineFormSteps.SECOND_PRODUCTS && <ProductsPage />}
            {step === PipelineFormSteps.THIRD && <ThirdPage />}
          </Form>
        </Formik>
      </Modal>
    </PipelineFormContext.Provider>
  );
};

export default HyperFunnelModal;
