import React, { useState } from 'react';

interface FileUploadProps {
  onUploadStart: (tempFile: { id: string; size: string }) => void;
  onUploadSuccess: () => void;
  onUploadError: (tempId: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadStart,
  onUploadSuccess,
  onUploadError,
}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert('Selecione um arquivo PDF.');

    const tempId = file.name;
    const tempSize = `${(file.size / 1024).toFixed(1)} kB`;

    onUploadStart({ id: tempId, size: tempSize });

    const formData = new FormData();
    formData.append('data', file);

    try {
      await fetch(process.env.UPLOAD_DOCUMENT_WEBHOOK || "", {
        method: 'POST',
        body: formData,
      });

      onUploadSuccess();
      setFile(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer upload do documento.');
      onUploadError(tempId);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full sm:w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-100 file:text-blue-700
          hover:file:bg-blue-200 cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;