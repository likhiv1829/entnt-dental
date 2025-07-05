import React from 'react';

export default function FileUpload({ files, setFiles }) {
  const handleFileChange = e => {
    const newFiles = Array.from(e.target.files);
    const readers = newFiles.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, url: reader.result });
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(results => setFiles([...files, ...results]));
  };

  return (
    <div className="w-full">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded w-full md:w-auto"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {files.map((f, idx) => (
          <span
            key={idx}
            className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
          >
            {f.name}
          </span>
        ))}
      </div>
    </div>
  );
}
