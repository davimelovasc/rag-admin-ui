import React from 'react';
import { FileItem } from '../types/file';
import { Trash2 } from 'lucide-react';

interface FileListProps {
  files: FileItem[];
  onDelete: (id: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete }) => {
  if (!files || files.length === 0) {
    return <p className="text-center text-gray-500">Nenhum documento enviado ainda.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {files.map((file) => (
        <li
          key={file.id}
          className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded"
        >
          <div className="flex-1 text-gray-800 truncate">{file.id}</div>
          <div className="text-sm text-gray-500 mr-4">
            {file.loading ? (
              <span className="flex items-center gap-2 text-blue-500">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></span>
                Enviando...
              </span>
            ) : (
              file.size
            )}
          </div>
          {!file.loading && (
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  'Tem certeza que deseja remover esse documento?'
                );
                if (confirmed) onDelete(file.id);
              }}
              className="text-red-500 hover:text-red-700 transition cursor-pointer"
              title="Remover"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FileList;