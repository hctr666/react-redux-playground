const initialState = {
  time: 0,
  tasks: []
}

export default function (state = initialState, action) {
  switch(action.type) {
    case 'task/add':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
    case 'task/delete':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      }
    default:
      return state
  }
}
