import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetails from './UserDetails';
import BookDetails from './BookDetails';
import EmployeeDetails from './EmployeeDetails';

function DashboardPage() {
    const [activeTab, setActiveTab] = useState('user');
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeTab === 'user') {
                    const response = await fetch('http://localhost:8080/api/v1/user/getUsers');
                    const data = await response.json();
                    setUsers(data);
                } else if (activeTab === 'book') {
                    const response = await fetch('http://localhost:8080/api/v1/book/getBooks');
                    const data = await response.json();
                    setBooks(data);
                } else if (activeTab === 'employee') {
                    const response = await fetch('http://localhost:8080/api/v1/employee/getEmployees');
                    const data = await response.json();
                    setEmployees(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [activeTab]);

    const handleLogout = () => {
        // Handle logout logic here
        navigate('/');
    };

    const handleUserUpdate = (updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'user':
                return <UserDetails users={users} setUsers={setUsers} onUserUpdate={handleUserUpdate} />;
            case 'book':
                return <BookDetails books={books} setBooks={setBooks} />;
            case 'employee':
                return <EmployeeDetails employees={employees} setEmployees={setEmployees} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-4">
                <h1>Dashboard</h1>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            <div className="row">
                <nav className="col-md-3">
                    <div className="nav flex-column nav-pills">
                        <button 
                            className={`nav-link ${activeTab === 'user' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('user')}
                        >
                            User Details
                        </button>
                        <button 
                            className={`nav-link ${activeTab === 'book' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('book')}
                        >
                            Book Details
                        </button>
                        <button 
                            className={`nav-link ${activeTab === 'employee' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('employee')}
                        >
                            Employee Details
                        </button>
                    </div>
                </nav>
                <div className="col-md-9">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
