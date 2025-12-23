import { useState } from "react"

const tasks = [
  {
    id: 1,
    title: "Купить продукты на неделю",
    isDone: false,
    addedAt: "1 сентября",
    priority: 2,
  },
  {
    id: 2,
    title: "Полить цветы",
    isDone: true,
    addedAt: "2 сентября",
    priority: 0,
  },
  {
    id: 3,
    title: "Сходить на тренировку",
    isDone: false,
    addedAt: "3 сентября",
    priority: 1,
  },
]



export function App() {

  const [selectedTaskId, setSelectedTaskkId] = useState(null);

  const maxPriority = Math.max(...tasks.map(task => task.priority));


  return (
    <div>
      <button onClick={() => {
        setSelectedTaskkId(null)
      }}>Сбросить выделение</button>
      {
        tasks.map((task) => {
          return (
            <div
              onClick={() => {
                setSelectedTaskkId(task.id)
              }}
              key={task.id}
              style={{
                border: task.id === selectedTaskId ? '3px solid blue' : '3px solid black',
                marginBottom: "5px",
                backgroundColor: task.priority === maxPriority ? 'orange' : 'white'
              }}
            >
              <div>
                <b>Заголовок:</b>{" "}
                <span
                  style={{
                    textDecoration: task.isDone ? 'line-through' : 'none'
                  }}
                >{task.title}</span>
              </div>
              <div>
                <b>Выполнено:</b>
                <input type="checkbox" checked={task.isDone} />
              </div>
              <div><b>Дата создания задачи:</b> {task.addedAt}</div>
            </div>
          )
        })
      }
    </div>
  )
}