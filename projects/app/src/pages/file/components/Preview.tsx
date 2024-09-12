import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Document, Page, pdfjs } from 'react-pdf';

// 设置 PDF.js 工作器的路径
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PreviewProps {
  file: File | null;
}

const Preview: React.FC<PreviewProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      console.log('PDF URL:', url);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error: any) => {
    console.error('Failed to load PDF file', error);
    setError('Failed to load PDF file');
  };

  if (!pdfUrl) return null;

  return (
    <Box mt={4}>
      {error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </Box>
  );
};

export default Preview;
