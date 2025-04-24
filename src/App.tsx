'use client'
import React, { useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import { FileItem } from './types/file';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  if(!process.env.NEXT_PUBLIC_LIST_DOCUMENT_WEBHOOK || !process.env.NEXT_PUBLIC_UPLOAD_DOCUMENT_WEBHOOK || !process.env.NEXT_PUBLIC_DELETE_DOCUMENT_BASE_WEBHOOK) {
    console.error("missing env vars")
  }

  const fetchFiles = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_LIST_DOCUMENT_WEBHOOK!);
      const data = await response.json();
      console.log(data);

      const validFiles = Array.isArray(data)
        ? data.filter((file) => file && file.id && file.size)
        : [];

      setFiles(validFiles);
    } catch (error) {
      console.error('Erro ao buscar arquivos:', error);
      setFiles([]);
    }
  };

  const deleteFile = async (id: string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_DELETE_DOCUMENT_BASE_WEBHOOK}/${id}`,
        { method: 'POST' }
      );
      await fetchFiles();
    } catch (err) {
      console.error('Erro ao deletar o arquivo:', err);
      alert('Erro ao deletar o documento.');
    }
  };

  const handleUploadStart = (tempFile: { id: string; size: string }) => {
    setFiles((prev) => [{ ...tempFile, loading: true }, ...prev]);
  };

  const handleUploadSuccess = async () => {
    await fetchFiles();
  };

  const handleUploadError = (tempId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== tempId));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Painel administrativo RAG</h1>
        <FileUpload
          onUploadStart={handleUploadStart}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
        />
        <hr className="my-6 border-t" />
        <FileList files={files} onDelete={deleteFile} />
      </div>
    </div>
  );
};

export default App;