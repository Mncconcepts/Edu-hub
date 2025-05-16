import React from 'react';
import './Dashboard.css';
import { FaUserCircle, FaChartPie, FaCalendarCheck, FaSignInAlt, FaBell } from 'react-icons/fa';
import {
  PieChart, Pie, Cell, Tooltip,
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';
import { Link } from 'react-router-dom';

const pieData = [
  { name: 'Present', value: 400 },
  { name: 'Absent', value: 100 },
  { name: 'Leave', value: 30 },
];

const COLORS = ['#22c55e', '#ef4444', '#facc15', '#3b82f6'];

const lineData = [
  { name: 'Jan', Present: 400, Absent: 100 },
  { name: 'Feb', Present: 300, Absent: 120 },
  { name: 'Mar', Present: 500, Absent: 80 },
  { name: 'Apr', Present: 450, Absent: 130 },
  { name: 'May', Present: 480, Absent: 90 },
  { name: 'Jun', Present: 520, Absent: 70 },
];

const logs = [
  { date: '15 Mar 2020', in: '10:15:28 AM', out: '06:15:21 PM', duration: '09:21', overtime: '01:05:08', late: '00:15:28', status: 'Present' },
  { date: '14 Mar 2020', in: '10:15:28 AM', out: '06:15:21 PM', duration: '09:21', overtime: '01:05:08', late: '00:15:28', status: 'Late' },
  { date: '13 Mar 2020', in: '10:15:28 AM', out: '06:15:21 PM', duration: '09:21', overtime: '01:05:08', late: '00:15:28', status: 'Leave' },
  { date: '12 Mar 2020', in: '10:15:28 AM', out: '06:15:21 PM', duration: '09:21', overtime: '01:05:08', late: '00:15:28', status: 'Absent' },
];

const timetable = [
  { day: 'Monday', subject: 'Mathematics', time: '8:00 AM - 9:30 AM' },
  { day: 'Tuesday', subject: 'Physics', time: '10:00 AM - 11:30 AM' },
  { day: 'Wednesday', subject: 'Computer Science', time: '12:00 PM - 1:30 PM' },
  { day: 'Thursday', subject: 'Chemistry', time: '2:00 PM - 3:30 PM' },
  { day: 'Friday', subject: 'English', time: '4:00 PM - 5:30 PM' },
];

const notifications = [
  'Assignment submission deadline extended to May 20.',
  'Final exams begin on June 1.',
  'Campus will remain closed on May 25 for maintenance.',
];

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <h2 className="logo">STUDENT<br />ATTENDANCE</h2>
        <nav>
          <a href="#dashboard"><FaChartPie /> Dashboard</a>
          <a href="#attendance"><FaCalendarCheck /> Attendance</a>
          <a href="#profile"><FaUserCircle /> Profile</a>
        </nav>
        <Link to="/login">
          <button className="login-btn"><FaSignInAlt /> Login</button>
        </Link>
      </aside>

      <main className="dashboard">
        <div className="header">
          <h1>DASHBOARD</h1>
          <div className="user-section">
           <Link to="/notification"><FaBell size={25} /></Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-summary">
          <div className="profile-pic"> <Link to="/profile"><FaUserCircle size={60} /></Link></div>
          <div className="profile-info text-white">
            <h3>John Doe</h3>
            <p>Email: johndoe23@gmial.com</p>
            <p>Student ID: 123456</p>
            <p>Class: Computer Science</p>
            <p>GPA: 3.8</p>
          </div>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card red"><p>Total Registrations</p><h2>6,54,29,708</h2></div>
          <div className="card green"><p>Present</p><h2>48,690</h2></div>
          <div className="card purple"><p>Absent</p><h2>7,932</h2></div>
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="pie-chart">
            <h3>Attendance Chart by Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="line-chart">
            <h3>Reports</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Present" stroke="#22c55e" />
                <Line type="monotone" dataKey="Absent" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Logs */}
        <div className="logs-section">
          <h3>Attendance Logs</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Work Duration</th>
                <th>Over Time</th>
                <th>Late By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i}>
                  <td>{log.date}</td>
                  <td>{log.in}</td>
                  <td>{log.out}</td>
                  <td>{log.duration}</td>
                  <td>{log.overtime}</td>
                  <td>{log.late}</td>
                  <td><span className={`status ${log.status.toLowerCase()}`}>{log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Timetable */}
        <div className="timetable-section">
          <h3>Class Timetable</h3>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Subject</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.subject}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
