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
    <div>
      <input type="file" multiple onChange={handleFileChange} className="border p-1" />
      <div className="flex gap-2 mt-1">
        {files.map((f, idx) => <span key={idx} className="text-xs">{f.name}</span>)}
      </div>
    </div>
  );
}
