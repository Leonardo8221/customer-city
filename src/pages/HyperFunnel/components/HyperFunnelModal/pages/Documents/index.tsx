import { Tab, TabPanel, Tabs, a11yProps } from 'components/ui/tab';
import { FC, useState, SyntheticEvent } from 'react';
import { DropDownArea, DocumentMain, FileNotification } from './ui';
import { FileUploader } from 'react-drag-drop-files';
import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Divider, Typography } from '@mui/material';
import { SecondaryButton, TextButton } from 'components/ui';
import ReactS3Client from 'react-aws-s3-typescript';
import { Buffer } from 'buffer';
import { s3Config } from 'core/constants';
import { useUser } from 'store/user/hooks';
import FileItem from './FileItem';
import { Loader } from 'components/Loader';

window.Buffer = window.Buffer || Buffer;

const fileTypes = ['PDF', 'DOC', 'DOCX', 'TXT', 'XLSX', 'XLS'];

export interface FileProperty {
  extention: string;
  size: number;
  name: string;
  location: string;
  fileKey: string;
}

const DocumentPage: FC = () => {
  const { user } = useUser();
  const s3 = new ReactS3Client(s3Config);
  const [files, setFiles] = useState<FileProperty[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onTabChange = (event: SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
  };

  const handleFileChange = async (file: any) => {
    try {
      const fileList = Object.keys(file).map((key) => file[key]);
      console.log('fileList', fileList);
      setLoading(() => true);

      await Promise.all(
        fileList.map(async (file) => {
          const newFileName = file.name.replace(/\..+$/, '');
          const { location, key } = await s3.uploadFile(file, `${user?.userId}/${newFileName}`);
          const fileProperty: FileProperty = {
            extention: String(file.name.split('.').pop()).toUpperCase(),
            size: file.size,
            name: file.name,
            location,
            fileKey: key,
          };
          setFiles((f) => [...f, fileProperty]);
        }),
      );

      setLoading(() => false);
    } catch (exception) {
      console.error(exception);
      setLoading(() => false);
    }
  };

  const handleDelete = (idx: number) => {
    setFiles(files.filter((file, i) => i !== idx));
  };

  return (
    <DocumentMain>
      {loading && <Loader />}
      <Tabs
        value={activeIndex}
        onChange={onTabChange}
        aria-label="sales documents"
        sx={{ '& .MuiTabs-scroller': { borderBottom: '1px solid #EEEFF1' } }}
      >
        <Tab
          label="Files"
          {...a11yProps(0)}
          icon={files.length > 0 ? <FileNotification>{files.length}</FileNotification> : undefined}
          iconPosition="end"
        />
        <Tab label="Links" {...a11yProps(1)} />
      </Tabs>

      <TabPanel hidden={activeIndex !== 0} sx={{ py: 3, height: '100%' }}>
        {files.map((file, idx) => (
          <FileItem key={idx} file={file} onDelete={() => handleDelete(idx)} />
        ))}
        <FileUploader
          classes="file-drop-zone"
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
          multiple
          onTypeError={(err: any) => console.error(err)}
          onSizeError={(err: any) => console.error(err)}
        >
          {files.length === 0 ? (
            <DropDownArea>
              <Typography variant="p12">{'You have not added any files yet'}</Typography>
              <SecondaryButton startIcon={<UploadIcon />}>Upload Documents</SecondaryButton>
              <Typography variant="p12">{'or'}</Typography>
              <Typography variant="p12">{'Drag&Drop here'}</Typography>
            </DropDownArea>
          ) : (
            <TextButton
              startIcon={<PlusIcon />}
              sx={{ fontSize: 12, fontWeight: 400, color: 'primary.main', '&:hover': { color: 'primary.main' } }}
            >
              Upload Documents
            </TextButton>
          )}
        </FileUploader>
      </TabPanel>

      <TabPanel hidden={activeIndex !== 1} sx={{ py: 3, height: '100%' }}>
        <DropDownArea>
          <Typography variant="p12">{'You have not added any links yet'}</Typography>
          <SecondaryButton startIcon={<PlusIcon />}>Add link</SecondaryButton>
        </DropDownArea>
      </TabPanel>

      <Divider />
    </DocumentMain>
  );
};

export default DocumentPage;
