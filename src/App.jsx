
import { useState } from 'react'
import {
  LayoutDashboard,
  ListTodo,
  Clock3,
  CheckCircle2,
  Plus,
  Search,
  CalendarDays,
  CircleUserRound,
  Trash2,
  Pencil,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react'

const initialTasks = [
  { id: 1, title: 'Complete React assignment', description: 'Build the task dashboard', priority: 'High', status: 'In Progress', dueDate: '2026-10-15', assignee: 'Parag' },
  { id: 2, title: 'Design dashboard UI', description: 'Prepare the layout and cards', priority: 'Medium', status: 'Completed', dueDate: '2026-10-14', assignee: 'Amit' },
  { id: 3, title: 'Test search functionality', description: 'Check search and filters', priority: 'High', status: 'To Do', dueDate: '2026-10-16', assignee: 'Parag' },
  { id: 4, title: 'Update project README', description: 'Add setup instructions', priority: 'Low', status: 'To Do', dueDate: '2026-10-20', assignee: 'Priya' },
  { id: 5, title: 'Review responsive design', description: 'Test mobile and tablet views', priority: 'Medium', status: 'In Progress', dueDate: '2026-10-13', assignee: 'Amit' },
  { id: 6, title: 'Deploy application', description: 'Publish the final website', priority: 'High', status: 'To Do', dueDate: '2026-10-22', assignee: 'Parag' },
  { id: 7, title: 'Create sample tasks', description: 'Prepare demo data', priority: 'Low', status: 'Completed', dueDate: '2026-10-12', assignee: 'Priya' },
  { id: 8, title: 'Check form validation', description: 'Verify required fields', priority: 'Medium', status: 'To Do', dueDate: '2026-10-18', assignee: 'Amit' },
]

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'All Tasks', icon: ListTodo },
  { name: 'In Progress', icon: Clock3 },
  { name: 'Completed', icon: CheckCircle2 },
]

function getToday() {
  const date = new Date()
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('task-dashboard-tasks')
      return saved ? JSON.parse(saved) : initialTasks
    } catch {
      return initialTasks
    }
  })

  const [activePage, setActivePage] = useState('Dashboard')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [sortBy, setSortBy] = useState('dueDate')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
    assignee: '',
  })

  const today = getToday()

  function saveTasks(nextTasks) {
    setTasks(nextTasks)
    try {
      localStorage.setItem('task-dashboard-tasks', JSON.stringify(nextTasks))
    } catch {
      alert('Unable to save tasks in this browser.')
    }
  }

  const completed = tasks.filter(
    task => task.status === 'Completed'
  ).length

  const inProgress = tasks.filter(
    task => task.status === 'In Progress'
  ).length

  const pending = tasks.filter(
    task => task.status === 'To Do'
  ).length

  const overdue = tasks.filter(
    task =>
      task.status !== 'Completed' &&
      task.dueDate &&
      task.dueDate < today
  ).length

  const visibleTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(task => {
      if (activePage === 'In Progress') {
        return task.status === 'In Progress'
      }

      if (activePage === 'Completed') {
        return task.status === 'Completed'
      }

      return statusFilter === 'All' || task.status === statusFilter
    })
    .filter(task =>
      priorityFilter === 'All' || task.priority === priorityFilter
    )
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const order = { High: 0, Medium: 1, Low: 2 }
        return order[a.priority] - order[b.priority]
      }

      return (a.dueDate || '9999-12-31').localeCompare(
        b.dueDate || '9999-12-31'
      )
    })

  function navigate(name) {
    setActivePage(name)
    setStatusFilter('All')
    setPriorityFilter('All')
    setSearch('')
    setMobileMenu(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openAdd() {
    setEditingTask(null)
    setForm({
      title: '',
      description: '',
      priority: 'Medium',
      status: activePage === 'In Progress' || activePage === 'Completed'
        ? activePage
        : 'To Do',
      dueDate: '',
      assignee: '',
    })
    setModalOpen(true)
  }

  function openEdit(task) {
    setEditingTask(task)
    setForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate || '',
      assignee: task.assignee || '',
    })
    setModalOpen(true)
  }

  function submitTask(event) {
    event.preventDefault()

    if (!form.title.trim()) return

    if (editingTask) {
      saveTasks(
        tasks.map(task =>
          task.id === editingTask.id
            ? { ...form, id: task.id, title: form.title.trim() }
            : task
        )
      )
    } else {
      saveTasks([
        ...tasks,
        {
          ...form,
          id: Date.now(),
          title: form.title.trim(),
        },
      ])
    }

    setModalOpen(false)
  }

  function deleteTask(task) {
    if (window.confirm(`Delete "${task.title}"?`)) {
      saveTasks(tasks.filter(item => item.id !== task.id))
    }
  }

  function changeStatus(task, status) {
    saveTasks(
      tasks.map(item =>
        item.id === task.id ? { ...item, status } : item
      )
    )
  }

  const stats = [
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: ListTodo,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Clock3,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
    },
    {
      label: 'Overdue',
      value: overdue,
      icon: CalendarDays,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {mobileMenu && (
        <button
          className="fixed inset-0 z-20 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileMenu(false)}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform lg:translate-x-0 ${
          mobileMenu ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2 text-white">
              <ListTodo size={23} />
            </div>
            <div>
              <h1 className="text-lg font-bold">TaskFlow</h1>
              <p className="text-xs text-slate-500">Task Management</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenu(false)}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X />
          </button>
        </div>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navItems.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => navigate(name)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                activePage === name
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={19} />
              {name}
              {activePage === name && (
                <ArrowUpRight className="ml-auto" size={16} />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl bg-indigo-50 p-4">
          <div className="mb-2 inline-flex rounded-lg bg-white p-2 text-indigo-600">
            <CalendarDays size={19} />
          </div>
          <p className="font-semibold text-slate-800">Stay on track</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Keep your tasks organized and meet your deadlines.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
          <div className="rounded-full bg-slate-100 p-2">
            <CircleUserRound size={22} />
          </div>
          <div>
            <p className="text-sm font-semibold">Parag Bhoyar</p>
            <p className="text-xs text-slate-500">Workspace member</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-h-screen lg:ml-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenu(true)}
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </button>

            <div>
              <p className="text-xs text-slate-500">
                Workspace / {activePage}
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                {activePage}
              </h2>
            </div>
          </div>

          <button
            onClick={openAdd}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:px-4"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add New Task</span>
            <span className="sm:hidden">Add Task</span>
          </button>
        </header>

        <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-8">

          {/* Dashboard page */}
          {activePage === 'Dashboard' && (
            <>
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    Welcome back, Parag!
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Here’s what’s happening with your tasks today.
                  </p>
                </div>

                <p className="text-sm text-slate-500">
                  {new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, icon: Icon, color, bg }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-500">
                        {label}
                      </p>
                      <div className={`rounded-xl p-2.5 ${bg} ${color}`}>
                        <Icon size={21} />
                      </div>
                    </div>
                    <p className="mt-4 text-3xl font-bold tracking-tight">
                      {value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Updated automatically
                    </p>
                  </div>
                ))}
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold">Task overview</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Check your tasks by status.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('All Tasks')}
                    className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100"
                  >
                    View all tasks
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { name: 'To Do', value: pending, color: 'bg-amber-500' },
                    { name: 'In Progress', value: inProgress, color: 'bg-sky-500' },
                    { name: 'Completed', value: completed, color: 'bg-emerald-500' },
                  ].map(item => (
                    <button
                      key={item.name}
                      onClick={() => navigate(item.name === 'To Do' ? 'All Tasks' : item.name)}
                      className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium text-slate-600">
                          {item.name}
                        </span>
                      </div>
                      <p className="mt-3 text-2xl font-bold">{item.value}</p>
                    </button>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Task pages */}
          {activePage !== 'Dashboard' && (
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div>
                    <h3 className="text-lg font-bold">
                      {activePage === 'All Tasks'
                        ? 'All Tasks'
                        : activePage === 'In Progress'
                          ? 'Tasks In Progress'
                          : 'Completed Tasks'}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {activePage === 'All Tasks'
                        ? 'Manage and track all your tasks.'
                        : activePage === 'In Progress'
                          ? 'Tasks that are currently being worked on.'
                          : 'Tasks that have been finished.'}
                    </p>
                  </div>

                  <div className="relative w-full lg:max-w-xs">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      value={search}
                      onChange={event => setSearch(event.target.value)}
                      placeholder="Search tasks..."
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {activePage === 'All Tasks' && (
                    <select
                      value={statusFilter}
                      onChange={event => setStatusFilter(event.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                    >
                      <option value="All">All statuses</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  )}

                  <select
                    value={priorityFilter}
                    onChange={event => setPriorityFilter(event.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                  >
                    <option value="All">All priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={event => setSortBy(event.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                  >
                    <option value="dueDate">Sort by due date</option>
                    <option value="priority">Sort by priority</option>
                  </select>

                  <span className="ml-auto self-center text-xs text-slate-500">
                    {visibleTasks.length} task(s)
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Task</th>
                      <th className="px-4 py-4 font-semibold">Priority</th>
                      <th className="px-4 py-4 font-semibold">Status</th>
                      <th className="px-4 py-4 font-semibold">Due date</th>
                      <th className="px-4 py-4 font-semibold">Assignee</th>
                      <th className="px-4 py-4 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {visibleTasks.map(task => (
                      <tr key={task.id} className="transition hover:bg-slate-50/80">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">
                            {task.title}
                          </p>
                          <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                            {task.description}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              task.priority === 'High'
                                ? 'bg-rose-50 text-rose-700'
                                : task.priority === 'Medium'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <select
                            aria-label={`Status for ${task.title}`}
                            value={task.status}
                            onChange={event => changeStatus(task, event.target.value)}
                            className="max-w-32 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs"
                          >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                          </select>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                          {task.dueDate || '—'}
                        </td>

                        <td className="px-4 py-4">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1.5 text-xs font-medium">
                            {task.assignee || 'Unassigned'}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => openEdit(task)}
                              aria-label={`Edit ${task.title}`}
                              className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => deleteTask(task)}
                              aria-label={`Delete ${task.title}`}
                              className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {visibleTasks.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-14 text-center">
                          <Search className="mx-auto mb-3 text-slate-300" size={30} />
                          <p className="font-medium">No tasks found</p>
                          <p className="mt-1 text-sm text-slate-500">
                            Try another search or change your filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <p className="text-center text-xs text-slate-400">
            TaskFlow · Built with React and Tailwind CSS
          </p>
        </div>
      </main>

      {/* Add / edit task modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-form-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 id="task-form-title" className="text-xl font-bold">
                  {editingTask ? 'Edit task' : 'Create a task'}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Fill in the details below.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close form"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitTask} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Task title *
                </label>
                <input
                  required
                  maxLength={120}
                  value={form.title}
                  onChange={event => setForm({ ...form, title: event.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="e.g. Prepare project report"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  maxLength={500}
                  rows={3}
                  value={form.description}
                  onChange={event => setForm({ ...form, description: event.target.value })}
                  className="w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder="Add task details..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={event => setForm({ ...form, priority: event.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={event => setForm({ ...form, status: event.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"
                  >
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Due date
                  </label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={event => setForm({ ...form, dueDate: event.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Assignee
                  </label>
                  <input
                    maxLength={80}
                    value={form.assignee}
                    onChange={event => setForm({ ...form, assignee: event.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
                    placeholder="Person's name"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  {editingTask ? 'Save changes' : 'Create task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
