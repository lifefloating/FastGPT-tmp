import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Document, Page, pdfjs } from 'react-pdf';

// 设置 PDF.js 工作器的路径
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PreviewProps {
  file: File | null;
}

const Preview: React.FC<PreviewProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (!pdfUrl) return null;

  return (
    <Box mt={4}>
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </Box>
  );
};

export default Preview;