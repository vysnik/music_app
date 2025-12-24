import { useEffect, useState } from "react"

export function App() {
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedTaskID, setSelectedTaskID] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
      headers: { "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d" },
    })
      .then((res) => res.json())
      .then((json) => setTasks(json.data))
      .catch(console.error)
  }, [])

  if (!tasks) return <div>Загрузка...</div>

  return (
    <div>
      <button onClick={() => setSelectedTask(null)}>Сбросить выделение</button>
      <div style={{ display: 'flex', gap: "30px" }}>
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setSelectedTask(task)
                setSelectedTaskID(task.id)
              }}
              style={{
                border: task === selectedTask ? "3px solid blue" : "3px solid black",
                marginBottom: "5px",
              }}
            >
              <div>
                <b>Заголовок:</b>{" "}
                <span style={{ textDecoration: task.isDone ? "line-through" : "none" }}>
                  {task.attributes.title}
                </span>
              </div>

              <div>
                <b>Выполнено:</b>
                <input type="checkbox" checked={task.isDone} readOnly />
              </div>

              <div><b>Дата создания задачи:</b> {new Date(task.attributes.addedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div>
          {!selectedTask && 'Track is not selected'}
        </div>
      </div>



    </div>
  )
}
