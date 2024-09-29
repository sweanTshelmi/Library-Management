
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styling

function HomePage() {
    return (
        <div className="homepage">
            <div className="overlay">
                <div className="content">
                    <h1 className="title">Library Management System</h1>
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
