// API-based solution for real-time collaborative submissions
let submissions = [];
let lastSubmissionCount = 0;
let activeUsers = new Set();
let userId = Date.now() + Math.random().toString(36).substr(2, 9);

async function submitSentence() {
    console.log('submitSentence function called');
    const userInput = document.getElementById('userInput');
    const text = userInput.value.trim();
    
    console.log('Text to submit:', text);
    
    if (!text) {
        console.log('No text to submit');
        return;
    }
    
    try {
        console.log('Sending POST request to /api/submit');
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, userId })
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
            const result = await response.json();
            console.log('Submit result:', result);
            userInput.value = ''; // Clear input
            await loadSubmissions(); // Refresh submissions
        } else {
            console.error('Failed to submit, status:', response.status);
            const errorText = await response.text();
            console.error('Error response:', errorText);
        }
    } catch (error) {
        console.error('Error submitting:', error);
    }
}

async function loadSubmissions() {
    console.log('Loading submissions...');
    try {
        const response = await fetch('/api/submit');
        console.log('Load response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Loaded data:', data);
            submissions = data.submissions;
            displaySubmissions();
            updateUserCount(data.activeUsers);
        } else {
            console.error('Failed to load submissions, status:', response.status);
        }
    } catch (error) {
        console.error('Error loading submissions:', error);
    }
}

function displaySubmissions() {
    console.log('Displaying submissions:', submissions);
    const submissionsDiv = document.getElementById('submissions');
    submissionsDiv.innerHTML = ''; // Clear existing
    
    submissions.forEach(submission => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'submission';
        sentenceDiv.textContent = submission.text;
        submissionsDiv.appendChild(sentenceDiv);
    });
}

function updateUserCount(count) {
    const userCountElement = document.getElementById('userCount');
    if (userCountElement) {
        userCountElement.textContent = `${count} people embedding memories`;
    }
}

// Send heartbeat to track active users
async function sendHeartbeat() {
    try {
        await fetch('/api/heartbeat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId })
        });
    } catch (error) {
        console.error('Error sending heartbeat:', error);
    }
}

// Copy all content function
function copyAllContent() {
    const submissionsDiv = document.getElementById('submissions');
    const submissions = submissionsDiv.querySelectorAll('.submission');
    
    if (submissions.length === 0) {
        alert('No memories to copy yet.');
        return;
    }
    
    let allText = 'The earliest thing I can remember\n\n';
    submissions.forEach((submission, index) => {
        allText += `${index + 1}. ${submission.textContent}\n`;
    });
    
    // Copy to clipboard
    navigator.clipboard.writeText(allText).then(() => {
        const copyButton = document.getElementById('copyButton');
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '✓';
        copyButton.classList.add('copy-success');
        
        setTimeout(() => {
            copyButton.innerHTML = originalText;
            copyButton.classList.remove('copy-success');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy. Please try again.');
    });
}

// Load submissions when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    loadSubmissions();
    
    // Send initial heartbeat
    sendHeartbeat();
    
    // Send heartbeat every 30 seconds to stay active
    setInterval(sendHeartbeat, 30000);
    
    // Poll for new submissions every 3 seconds
    setInterval(async () => {
        try {
            const response = await fetch('/api/submit');
            if (response.ok) {
                const data = await response.json();
                
                // Check if there are new submissions
                if (data.count > lastSubmissionCount) {
                    submissions = data.submissions;
                    displaySubmissions();
                    updateUserCount(data.activeUsers);
                    lastSubmissionCount = data.count;
                }
                
                // Update user count even if no new submissions
                updateUserCount(data.activeUsers);
            }
        } catch (error) {
            console.error('Error polling for updates:', error);
        }
    }, 3000);
});
