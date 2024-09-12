import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useSelectFile } from '@/web/common/file/hooks/useSelectFile';
import Preview from './components/Preview';
import { ImportSourceItemType } from '@/web/core/dataset/type';

const FilePage = () => {
  const [selectFiles, setSelectFiles] = useState<ImportSourceItemType[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { File, onOpen } = useSelectFile({
    fileType: '.pdf',
    multiple: false
  });

  const handleFileSelect = (files: File[]) => {
    const newFiles = files.map((file) => ({
      id: file.name,
      file,
      sourceName: file.name,
      sourceSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      icon: 'pdf',
      uploadedFileRate: 100,
      isUploading: false
    }));
    setSelectFiles(newFiles);
    setSelectedFile(files[0]);
  };

  return (
    <Box p={4}>
      <File onSelect={handleFileSelect} />

      <Button onClick={onOpen} mt={4}>
        选择 PDF 文件
      </Button>

      {selectedFile && (
        <Box mt={4}>
          <Preview file={selectedFile} />
        </Box>
      )}
    </Box>
  );
};

export default FilePage;
