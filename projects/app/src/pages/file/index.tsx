// 文件路径: /projects/app/src/pages/file/index.tsx

import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const FilePage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
  };

  return (
    <Box p={4}>
      <Input type="file" accept="application/pdf" onChange={handleFileChange} />
      {file && (
        <Box mt={4}>
          <Button onClick={() => router.push(fileUrl || '')}>预览文件</Button>
        </Box>
      )}
      {fileUrl && (
        <Box mt={4}>
          <iframe src={fileUrl} width="100%" height="600px" />
        </Box>
      )}
    </Box>
  );
};

export default FilePage;