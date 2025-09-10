# How Do You Home? - Psychic Ingestion

A real-time collaborative text submission application inspired by the elo-2025 project. Users can submit sentences that appear in real-time for all participants to see.

## Features

- **Real-time Collaboration**: See other users' submissions appear instantly
- **Simple Interface**: Clean, minimal design focused on text submission
- **Live User Count**: See how many people are currently active
- **Persistent Storage**: Submissions are stored in memory during session
- **Heartbeat System**: Tracks active users with automatic cleanup
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Submit a Sentence**: Type your text in the input field and click "Enter"
2. **View Submissions**: See all submitted sentences displayed below
3. **Real-time Updates**: Watch as new submissions appear automatically
4. **User Tracking**: See how many people are currently active

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## Deployment to Vercel

This application is fully compatible with Vercel's serverless architecture:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

The application uses API-based real-time updates instead of WebSockets, making it perfect for Vercel deployment.

## Project Structure

```
├── api/
│   ├── index.js          # Main Express server
│   ├── submit.js         # Submit/get submissions API
│   └── heartbeat.js      # User heartbeat tracking API
├── public/
│   ├── index.html        # Main application page
│   └── client.js         # Frontend JavaScript
├── package.json          # Dependencies and scripts
├── vercel.json          # Vercel deployment configuration
└── README.md            # This file
```

## Technical Details

- **Backend**: Express.js with serverless API endpoints
- **Frontend**: Vanilla JavaScript with polling for real-time updates
- **Real-time**: Polling-based updates every 3 seconds
- **Storage**: In-memory storage (submissions reset on server restart)
- **User Tracking**: Heartbeat system with 2-minute timeout
- **Styling**: Clean, minimal CSS with Times New Roman font

## API Endpoints

- `GET /api/submit` - Retrieve all submissions
- `POST /api/submit` - Submit a new sentence
- `POST /api/heartbeat` - Update user activity status

## Environment Variables

For production deployment, you may want to set:

- `NODE_ENV=production`
- `PORT=3000` (for local development)

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes!
