import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useSelectFile } from '@/web/common/file/hooks/useSelectFile';
import FileSelector from '@/pages/dataset/detail/components/Import/components/FileSelector';
import RenderUploadFiles from '@/pages/dataset/detail/components/Import/components/RenderFiles';
import Preview from './components/Preview';
import { ImportSourceItemType } from '@/web/core/dataset/type';

const FilePage = () => {
  const [selectFiles, setSelectFiles] = useState<ImportSourceItemType[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const { File, onOpen } = useSelectFile({
    fileType: '.pdf',
    multiple: false
  });

  const handleFileSelect = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: file.name,
      file,
      sourceName: file.name,
      sourceSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      icon: 'pdf',
      uploadedFileRate: 100,
      isUploading: false
    }));
    setSelectFiles(newFiles);
  };

  return (
    <Box p={4}>
      <FileSelector
        fileType=".pdf"
        selectFiles={selectFiles}
        setSelectFiles={setSelectFiles}
        onStartSelect={() => {}}
        onFinishSelect={() => setShowPreview(true)}
      />
      
      <File onSelect={handleFileSelect} />
      
      <Button onClick={onOpen} mt={4}>
        选择 PDF 文件
      </Button>

      {selectFiles.length > 0 && (
        <Box mt={4}>
          <RenderUploadFiles
            files={selectFiles}
            setFiles={setSelectFiles}
            showPreviewContent={true}
          />
        </Box>
      )}

      {showPreview && (
        <Box mt={4}>
          <Preview showPreviewChunks={false} />
        </Box>
      )}
    </Box>
  );
};

export default FilePage;