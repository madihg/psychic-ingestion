# How Do You Home - Line Dropper

A real-time collaborative line dropping application inspired by the elo-2025 project. Users can drop text lines anywhere on the screen and see others' lines in real-time.

## Features

- **Real-time Collaboration**: See other users' lines appear instantly
- **Interactive Interface**: Click anywhere to drop a line
- **Line Editing**: Double-click any line to edit its text
- **Line Deletion**: Right-click any line to delete it
- **Color Selection**: Choose from 8 different text colors
- **User Count**: See how many users are currently online
- **Connection Status**: Visual indicator of connection state
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Drop a Line**: Click anywhere on the screen and enter your text
2. **Edit a Line**: Double-click any line to modify its text
3. **Delete a Line**: Right-click any line to remove it
4. **Change Colors**: Use the color picker in the top-right corner
5. **Real-time Updates**: Watch as other users' lines appear instantly

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

### Option 1: Deploy with Socket.IO (Recommended for Real-time Features)

Since Vercel's serverless functions don't support WebSocket connections, you'll need to deploy the Socket.IO server separately:

1. **Deploy Socket.IO Server to Railway/Heroku**:
   - Create a new Railway or Heroku app
   - Deploy the `api/index.js` file as a standalone server
   - Note the deployed URL (e.g., `https://your-app.railway.app`)

2. **Update Frontend Connection**:
   - Modify the Socket.IO connection in `public/index.html`:
   ```javascript
   this.socket = io('https://your-app.railway.app');
   ```

3. **Deploy Frontend to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

### Option 2: Deploy Everything to Vercel (Limited Real-time Features)

For a simpler deployment without real-time features:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

**Note**: This approach will work for the basic interface but won't have real-time collaboration features due to Vercel's serverless limitations.

## Project Structure

```
├── api/
│   └── index.js          # Express server with Socket.IO
├── public/
│   └── index.html        # Frontend application
├── package.json          # Dependencies and scripts
├── vercel.json          # Vercel deployment configuration
└── README.md            # This file
```

## Technical Details

- **Backend**: Express.js with Socket.IO for real-time communication
- **Frontend**: Vanilla JavaScript with modern CSS
- **Real-time**: WebSocket connections for instant updates
- **Storage**: In-memory storage (lines reset on server restart)
- **Styling**: CSS Grid and Flexbox with backdrop filters

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
