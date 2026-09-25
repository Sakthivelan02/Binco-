import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearSession, getSession } from '../auth';

const tasks = [
  { title: 'Review project brief', meta: 'Today · 10:30 AM', color: 'violet', done: true },
  { title: 'Prepare weekly update', meta: 'Today · 2:00 PM', color: 'coral', done: false },
  { title: 'Plan tomorrow’s work', meta: 'Tomorrow · 9:00 AM', color: 'mint', done: false },
];

function Dashboard() {
  const navigate = useNavigate();
  const user = getSession();
  const firstName = user?.name?.split(' ')[0] || 'there';

  useEffect(() => {
    document.title = 'Dashboard — Binco';
  }, []);

  function handleLogout() {
    clearSession();
    navigate('/', { replace: true });
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <a className="brand dashboard-brand" href="/dashboard" aria-label="Binco dashboard">
          <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>Binco</span>
        </a>
        <div className="header-actions">
          <span className="user-chip">
            <span className="avatar small">JL</span>
            <span className="user-details"><strong>{user?.name}</strong><small>{user?.role}</small></span>
          </span>
          <button className="logout-button" type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-row">
          <div>
            <p className="eyebrow dark">YOUR WORKSPACE</p>
            <h1>Good to see you, {firstName}.</h1>
            <p>Here’s a quick look at what’s moving today.</p>
          </div>
          <button className="new-task-button" type="button"><span>+</span> New task</button>
        </section>

        <section className="stat-grid" aria-label="Workspace overview">
          <article className="stat-card purple">
            <span className="stat-icon">✓</span>
            <div><strong>12</strong><span>Tasks completed</span></div>
            <small>↑ 18% this week</small>
          </article>
          <article className="stat-card orange">
            <span className="stat-icon">◷</span>
            <div><strong>5</strong><span>In progress</span></div>
            <small>2 due today</small>
          </article>
          <article className="stat-card green">
            <span className="stat-icon">◎</span>
            <div><strong>84%</strong><span>Weekly focus</span></div>
            <small>On track</small>
          </article>
        </section>

        <section className="dashboard-content">
          <article className="tasks-card">
            <div className="card-title-row">
              <div><h2>Today’s priorities</h2><p>Three items on your list</p></div>
              <button type="button">View all</button>
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <div className={`task-item ${task.done ? 'is-done' : ''}`} key={task.title}>
                  <span className={`task-check ${task.color}`}>{task.done ? '✓' : ''}</span>
                  <span className="task-copy"><strong>{task.title}</strong><small>{task.meta}</small></span>
                  <button type="button" aria-label={`More options for ${task.title}`}>•••</button>
                </div>
              ))}
            </div>
          </article>

          <aside className="focus-card">
            <span className="focus-orbit"><span>42</span><small>MIN</small></span>
            <p className="eyebrow">FOCUS SESSION</p>
            <h2>Protect your momentum.</h2>
            <p>Start a quiet work block and give one task your full attention.</p>
            <button type="button">Start focus time</button>
          </aside>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;
