const { Task, User } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

const createTask = async (req, res) => {
  if (!req.body.hasOwnProperty("title") || !req.body.hasOwnProperty("description") || !req.body.hasOwnProperty("dueDate") || !req.body.hasOwnProperty("assigneeId")){
    return res.status(400).json({ error: 'Please enter all the required information (title, description, dueDate, assigneeId)' });
  }
  
  const { title, description, dueDate, assigneeId } = req.body;
  if (!title || !description || !dueDate || !assigneeId){
    return res.status(400).json({ error: 'Please enter all the required information (title, description, dueDate, assigneeId)' });
  }
  if(dueDate ){
    const isValiddueDate = moment(dueDate, 'YYYY-MM-DD', true).isValid();
      if (!isValiddueDate) {
        return res.status(400).json({ error: 'Invalid due date format. Use YYYY-MM-DD' });
      }
    }
  if(assigneeId && isNaN(assigneeId)){
    return res.status(400).json({ error: 'Please enter a valid ID' });

  }else{
    const userr = await Task.findOne({ where: { assigneeId } });
    if (!userr) {
      return res.status(400).json({ error: 'Please enter a valid ID' });
  }}
  const task = await Task.create({ title, description, dueDate, assigneeId });
  res.status(201).send(task);
};

const getAllTasks = async (req, res) => {
  const { status, assigneeid, startDate, endDate } = req.query;
  let tasks = {} ;
  if(status){
    if(status != "pending" && status != "canceled" && status != "completed" ){
    return res.status(400).json({ error: 'Please enter a valid status value (pending , completed , canceled)'});}
  }
  if(assigneeid && isNaN(assigneeid)){
    return res.status(400).json({ error: 'Please enter a valid ID' });

  }else{
    const userr = await Task.findOne({ where: { assigneeId : assigneeid } });
    if (!userr) {
      return res.status(400).json({ error: 'Please enter a valid ID' });
  }}
if(startDate ){
  const isValidstartDate = moment(startDate, 'YYYY-MM-DD', true).isValid();
    if (!isValidstartDate) {
      return res.status(400).json({ error: 'Invalid start date format. Use YYYY-MM-DD' });
    }
  }
  if(endDate ){
    const isValidendDate = moment(endDate, 'YYYY-MM-DD', true).isValid();
    if (!isValidendDate) {
      return res.status(400).json({ error: 'Invalid end date format. Use YYYY-MM-DD' });
    }
    
    }
  
  if( (startDate && !endDate) || (!startDate && endDate) ){
    return res.status(400).json({ error: 'Please enter both the start and end dates' });
  }
  else if (req.user.role == "Manager" && !status && !assigneeid && !startDate) {
    tasks = await Task.findAll({ include: [
      {
        model: User,
        as: 'assignee',
      },
      { model: Task, as: 'Dependencies' },
      { model: Task, as: 'DependedOnBy' }
    ] });
}
else if (req.user.role == "Manager" && status && !assigneeid && !startDate) {
  tasks = await Task.findAll({where: {
    status: status,
  }, include: [
    {
      model: User,
      as: 'assignee',
    },
    { model: Task, as: 'Dependencies' },
    { model: Task, as: 'DependedOnBy' }
  ] });
}else if(req.user.role == "Manager" && !status && assigneeid && !startDate){
  tasks = await Task.findAll({where: {
    assigneeId : assigneeid,
  }, include: [
    {
      model: User,
      as: 'assignee',
    },
    { model: Task, as: 'Dependencies' },
    { model: Task, as: 'DependedOnBy' }
  ] });
}else if(req.user.role == "Manager" && !status && !assigneeid && startDate){
  tasks = await Task.findAll({where: {
    dueDate : {[Op.between]: [new Date(startDate), new Date(endDate)]},
  }, include: [
    {
      model: User,
      as: 'assignee',
    },
    { model: Task, as: 'Dependencies' },
    { model: Task, as: 'DependedOnBy' }
  ]});
}else if(req.user.role == "Manager" && status && assigneeid && !startDate){
  tasks = await Task.findAll({where: {
    status: status,
    assigneeId : assigneeid,
  }, include: [
    {
      model: User,
      as: 'assignee',
    },
    { model: Task, as: 'Dependencies' },
    { model: Task, as: 'DependedOnBy' }
  ] });
}else if(req.user.role == "Manager" && status && !assigneeid && startDate){
  tasks = await Task.findAll({where: {
    status: status,
    dueDate : {[Op.between]: [new Date(startDate), new Date(endDate)]},
  }, include: [
    {
      model: User,
      as: 'assignee',
    },
    { model: Task, as: 'Dependencies' },
    { model: Task, as: 'DependedOnBy' }
  ] });
}else if(req.user.role == "Manager" && !status && !assigneeid && startDate){
  tasks = await Task.findAll({where: {
    dueDate : {[Op.between]: [new Date(startDate), new Date(endDate)]},
  }, include: [
    {
      model: User,
      as: 'assignee',
    },
    { model: Task, as: 'Dependencies' },
    { model: Task, as: 'DependedOnBy' }
  ] });
}else if(req.user.role == "Manager" && status && assigneeid && startDate){
  tasks = await Task.findAll({where: {
    status: status,
    assigneeId : assigneeid,
    dueDate : {[Op.between]: [new Date(startDate), new Date(endDate)]},
  }, include: [
    {
      model: User,
      as: 'assignee',
    },
    { model: Task, as: 'Dependencies' },
    { model: Task, as: 'DependedOnBy' }
  ] });
}else if (req.user.role == "User" && !status && !startDate ){
  tasks = await Task.findAll({where: {
      assigneeId: req.user.id,
    }, include: 'assignee' });
}else if (req.user.role == "User" && status && !startDate ){
  tasks = await Task.findAll({where: {
      assigneeId: req.user.id,
      status: status,
    }, include: 'assignee' });
}else if (req.user.role == "User" && !status && startDate ){
  tasks = await Task.findAll({where: {
      assigneeId: req.user.id,
      dueDate : {[Op.between]: [new Date(startDate), new Date(endDate)]},
    }, include: 'assignee' });
}else if (req.user.role == "User" && status && startDate ){
  tasks = await Task.findAll({where: {
      assigneeId: req.user.id,
      status: status,
      dueDate : {[Op.between]: [new Date(startDate), new Date(endDate)]},
    }, include: 'assignee' });
}

if(tasks.length == 0 ){
  return res.status(400).json({ error: 'No tasks found with the specified filters' });
}else{
  res.send(tasks);
}
};

const getTaskDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignee',
        },
        { model: Task, as: 'Dependencies' },
        { model: Task, as: 'DependedOnBy' }
      ],
    });
    if (!task) {
      return res.status(404).json({ error: 'No task found with the specified ID' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'No task found with the specified ID' });
  }

  if (req.user.role !== 'Manager' && req.user.id !== task.assigneeId) {
    return res.status(403).send('Permission Denied');
  }

  const { title, description, dueDate, status , assigneeId, dependencies } = req.body;
  if(status){
    if(status != "pending" && status != "canceled" && status != "completed" ){
    return res.status(400).json({ error: 'Please enter a valid status value (pending , completed , canceled)'});}
  }
  if(assigneeId && isNaN(assigneeId)){
    return res.status(400).json({ error: 'Please enter a valid ID' });

  }else{
    const userr = await Task.findOne({ where: { assigneeId : assigneeId } });
    if (!userr) {
      return res.status(400).json({ error: 'Please enter a valid ID' });
  }}
  dd = new Date(dueDate);
  if (dueDate && isNaN(dd)){
    return res.status(400).json({ error: 'Please enter a valid date format yyyy-mm-dd' });
}

  if ( !title && !description && !dueDate && !status && !assigneeId && !dependencies){
    return res.status(400).json({ error: 'Did not receive a valid key to update' });
  }
  if (title) task.title = title;
  if (description) task.description = description;
  if (dueDate) { 
    const isValidDate = moment(dueDate, 'YYYY-MM-DD', true).isValid();
    if (!isValidDate) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
    }
    task.dueDate = dueDate;
  }
  if (status) task.status = status;
  if (assigneeId) {
  if (req.user.role !== 'Manager') {
      return res.status(403).json({ error: 'Only managers can assign tasks' });
    }else{
    const assignee = await User.findByPk(assigneeId);
    if (!assignee) {
      return res.status(404).json({ error: 'Assignee not found' });
    }
    task.assigneeId = assigneeId ;
  }}
    
  if (dependencies) {

    if (!Array.isArray(dependencies)) {
      return res.status(400).json({ error: 'Dependencies must be an array of task IDs' });
    }

    const areAllNumbers = dependencies.every(depId => Number.isInteger(depId));
    if (!areAllNumbers) {
      return res.status(400).json({ error: 'Dependencies must be an array of integers' });
    }

    const currentDependencies = await task.getDependencies();
    const currentDependencyIds = currentDependencies.map(dep => dep.id);
    const newDependencyIds = dependencies.filter(depId => !currentDependencyIds.includes(depId));

      if (newDependencyIds.length > 0) {
        const newDependencies = await Task.findAll({ where: { id: newDependencyIds } });
        await task.addDependencies(newDependencies);
      }
  }

  if (status === 'completed') {
    const incompleteDependencies = await task.getDependencies({
      where: { status: { [Op.not]: 'completed' } }
    });

    if (incompleteDependencies.length > 0) {
      return res.status(400).json({ error: 'Cannot complete task with incomplete dependencies' });
    }

    task.status = status;
  }
  await task.save();
  res.send(task);
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskDetails,
  updateTask
};
