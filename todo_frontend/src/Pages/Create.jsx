import React, { useState } from "react";
import { Plus, X, Save, Loader2 } from "lucide-react";

function Create({ onTaskCreated }) {
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const createTask = async () => {
    if (!task.trim()) {
      setError("Please enter a task");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Replace with your actual API call
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task.trim() }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        // Clear form and close
        setTask("");
        setShowForm(false);

        // Call parent callback if provided
        onTaskCreated && onTaskCreated(result);

        // Only reload if no callback is provided (for backward compatibility)
        if (!onTaskCreated) {
          window.location.reload();
        }
      } else {
        setError("Failed to create task. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createTask();
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setTask("");
    setError("");
    setShowForm(false);
  };

  return (
    <div className="w-full">
      {!showForm ? (
        // Collapsed state - Add Task Button
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-gray-600 hover:text-blue-600 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="font-medium">Add New Task</span>
        </button>
      ) : (
        // Expanded state - Create Form
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Create New Task
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Create Task Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Description
              </label>
              <textarea
                placeholder="What needs to be done?"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyPress}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                disabled={isLoading}
              />
              <div className="mt-1 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Press Enter to save, Escape to cancel
                </p>
                <p className="text-xs text-gray-400">{task.length}/200</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={createTask}
                disabled={isLoading || !task.trim()}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Task</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Quick Add:</p>
            <div className="flex flex-wrap gap-2">
              {[
                "Review code changes",
                "Update documentation",
                "Schedule team meeting",
                "Prepare presentation",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setTask(suggestion)}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Create;
