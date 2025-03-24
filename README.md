# Klinge's Corner Educational Platform

An interactive educational platform featuring an integrated development environment (IDE) for teaching programming and computer science concepts.

## Features

- Multi-language support (Python, JavaScript, HTML, CSS, C)
- Real-time code collaboration
- Automated testing and grading
- Class management system
- Assignment tracking and submission
- Calendar integration
- Role-based access control (Student/Teacher/Admin)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/klinges-corner.git
cd klinges-corner
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Update the variables with your configuration

4. Start MongoDB:
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo service mongod start
```

5. Start the development servers:
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend server (from frontend directory)
npm start
```

## Usage

### For Teachers

1. Create an account with teacher role
2. Create classes and generate class codes
3. Create assignments with requirements and test cases
4. Monitor student submissions and provide feedback
5. Track student progress and grades

### For Students

1. Create an account with student role
2. Join classes using class codes provided by teachers
3. View assignments in the calendar
4. Complete assignments using the IDE
5. Submit work and receive feedback
6. Track grades and progress

## Security Considerations

- All passwords are hashed using bcrypt
- JWT-based authentication
- Role-based access control
- Secure file storage
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Monaco Editor for the code editor
- Socket.IO for real-time collaboration
- FullCalendar for the calendar integration
- Pyodide for Python execution in the browser

## Support

For support, please open an issue in the GitHub repository or contact the development team. 