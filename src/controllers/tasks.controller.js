import Task from "../models/task.model.js";

export const getTasksByUser = async (req, res) => {
  // xq de todas las tasks solo devuelva las de userAuth
  // el populate es para que no solo traiga el userId, sino el objeto user
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task) return res.status(404).json({ message: "Tasks not found" })
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({ title, description, date, user: req.user.id });
    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const updateTask = async (req, res) => {
  // el findByIdAndUpdate si lo encuentra devuelve la tarea, pero la antigua (antes del update)
  // por eso pongo new: true, para que la que me muestre la response sea la updateada
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ message: "Task not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}