import { useEffect, useState } from "react";
import axios from "axios";
import {
  Check,
  Trash2,
  Edit3,
  LogOut,
  CheckCircle2,
  Save,
  X,
} from "lucide-react";
import Create from "./Create";
import { useNavigate } from "react-router-dom";

function Home({ onLogout }) {
  const [todos, setTodos] = useState([]);
  const [updatetask, setUpdatetask] = useState("");
  const [taskid, setTaskid] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // await fetch("http://localhost:5000/logout", {
      //   method: "POST",
      //   credentials: "include",
      // });
      // onLogout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/get", { withCredentials: true })
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  const edit = (id) => {
    axios
      .put(`http://localhost:5000/edit/${id}`)
      .then(() => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const Update = (id, updatedTask) => {
    axios
      .put(`http://localhost:5000/update/${id}`, { task: updatedTask })
      .then(() => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return { ...todo, task: updatedTask };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setTaskid("");
        setUpdatetask("");
        window.location.reload(); // fix: lowercase 'w'
      })
      .catch((err) => console.log(err));
  };

  const Hdelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const handleCancelEdit = () => {
    setTaskid("");
    setUpdatetask("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  My Todo List
                </h1>
                <p className="text-gray-600">Stay organized and productive</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Cards */}

        <Create />

        {/* Todo List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
          </div>

          {todos.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-400">
                Add your first task to get started!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => edit(todo._id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          todo.done
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        {todo.done && <Check className="w-4 h-4" />}
                      </button>

                      {taskid === todo._id ? (
                        <div className="flex items-center space-x-3 flex-1">
                          <input
                            type="text"
                            value={updatetask}
                            onChange={(e) => setUpdatetask(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyDown={(e) =>
                              e.key === "Enter" && Update(todo._id, updatetask)
                            }
                            autoFocus
                          />
                          <button
                            onClick={() => Update(todo._id, updatetask)}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <p
                          className={`flex-1 ${
                            todo.done
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          } font-medium`}
                        >
                          {todo.task}
                        </p>
                      )}
                    </div>

                    {taskid !== todo._id && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setTaskid(todo._id);
                            setUpdatetask(todo.task);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => Hdelete(todo._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
