import { useEffect, useState } from "react"

export function App() {
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedTaskID, setSelectedTaskID] = useState(null)
  const [tasks, setTasks] = useState([])
  const [boardId, setBoardId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
      headers: { "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d" },
    })
      .then((res) => res.json())
      .then((json) => setTasks(json.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (boardId === null || selectedTaskID === null) {
      return;
    }

    fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${selectedTaskID}/`, {
      headers: { "api-key": "8698cd1f-ce62-4fe5-ad5f-20c0c0180e8d" },
    })
      .then((res) => res.json())
      .then((json) => setSelectedTask(json.data))
      .finally(() => setIsLoading(false))
      .catch(console.error)
  }, [selectedTaskID, setBoardId])

  if (!tasks) return <div>Загрузка...</div>

  return (
    <div>
      <button onClick={() => {
        setSelectedTaskID(null)
        setSelectedTask(null)
        setBoardId(null)
      }}>Сбросить выделение</button>
      <div style={{ display: 'flex', gap: "30px" }}>
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => {
                setSelectedTaskID(task.id)
                setBoardId(task.attributes.boardId)
                setIsLoading(true)
                setSelectedTask(null)
              }}
              style={{
                border: selectedTaskID === task.id ? "3px solid blue" : "3px solid black",
                padding: "5px",
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
        <div style={{
          border: "3px solid black",
          padding: "5px",
          marginBottom: "5px",
        }}>
          <h3>Task details</h3>
          {!selectedTaskID && <p>Task is not selected</p>}
          {isLoading && <p>Loading...</p>}
          <p>{selectedTask && !isLoading && selectedTask.attributes.title}</p>
          <p>{selectedTask && !isLoading && selectedTask.attributes.description}</p>

        </div>
      </div>



    </div>
  )
}
