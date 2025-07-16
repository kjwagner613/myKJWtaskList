const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
  { timestamps: true }
);

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Home', 'Work', 'Hobby', 'Personal', 'Medical', 'Entertainment']
  },
  notes: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled']
  },
  tags: {
    type: [String],
    required: false,
  },
  attachments: {
    type: [String],
    required: false,
  },

  subtasks: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled']
    },
    dueDate: { type: Date, required: false },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional
  }],

  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [commentSchema],
},
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;