import app from './app.js';
import connectDB from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Only listen if not running on Vercel (Vercel handles the export)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// Export the app for Vercel
export default app;
