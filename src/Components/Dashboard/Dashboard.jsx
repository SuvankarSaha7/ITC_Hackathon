import React, { useState } from "react";
import { Upload, File, X, User } from "lucide-react";

// Navbar Component
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-semibold text-lg">ITC</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Interview Prep
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-inner">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

// FileUploadCard Component
const FileUploadCard = ({
  title,
  subtitle,
  files,
  onFileUpload,
  onFileRemove,
  accept,
  multiple = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFileUpload(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFileUpload(selectedFiles);
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-transparent rounded-2xl pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{subtitle}</p>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50 scale-[1.02]"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <input
            type="file"
            id={`file-${title}`}
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />
          <label htmlFor={`file-${title}`} className="cursor-pointer">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-base font-medium text-gray-800 mb-2">
                Drag & drop or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Supports PDF, DOCX, and TXT files
              </p>
            </div>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Uploaded Files ({files.length})
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <File className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onFileRemove(index)}
                    className="ml-4 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [resumes, setResumes] = useState([]);

  const handleJobDescriptionUpload = (newFiles) => {
    setJobDescriptions([...jobDescriptions, ...newFiles]);
  };

  const handleResumeUpload = (newFiles) => {
    setResumes([...resumes, ...newFiles]);
  };

  const handleJobDescriptionRemove = (index) => {
    setJobDescriptions(jobDescriptions.filter((_, i) => i !== index));
  };

  const handleResumeRemove = (index) => {
    setResumes(resumes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            AI Interview Preparation
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Upload your <span className="font-semibold text-gray-800">Job Description</span> and{" "}
            <span className="font-semibold text-gray-800">Resumes</span> to get detailed,
            AI-powered insights tailored for your next interview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FileUploadCard
            title="Job Description"
            subtitle="Upload the job description you're applying for"
            files={jobDescriptions}
            onFileUpload={handleJobDescriptionUpload}
            onFileRemove={handleJobDescriptionRemove}
            accept=".pdf,.docx,.txt,.doc"
            multiple={false}
          />

          <FileUploadCard
            title="Resumes"
            subtitle="Upload one or multiple resumes"
            files={resumes}
            onFileUpload={handleResumeUpload}
            onFileRemove={handleResumeRemove}
            accept=".pdf,.docx,.txt,.doc"
            multiple={true}
          />
        </div>

        {(jobDescriptions.length > 0 || resumes.length > 0) && (
          <div className="mt-12 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg p-8 transition-all hover:shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Ready to analyze your files?
                </h3>
                <p className="text-sm text-gray-600">
                  {jobDescriptions.length} job description(s) and{" "}
                  {resumes.length} resume(s) uploaded
                </p>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Start AI Analysis
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
