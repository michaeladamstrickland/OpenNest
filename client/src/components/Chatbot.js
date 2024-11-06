import React, { useState } from 'react';
import { IconButton, Drawer, TextField, Box, Typography } from '@mui/material';
import { Send, Chat } from '@mui/icons-material';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message) return;
  
    setChatHistory((prev) => [...prev, { user: 'You', message }]);
  
    try {
      const response = await fetch('http://localhost:5000/api/chatbot-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });
  
      const data = await response.json();
      const botMessage = data.response;
  
      setChatHistory((prev) => [...prev, { user: 'Bot', message: botMessage }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      setChatHistory((prev) => [...prev, { user: 'Bot', message: 'Error: Unable to connect to chatbot' }]);
    }
  };


  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
      >
        <Chat />
      </IconButton>
      <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Chat Header */}
          <Box sx={{ backgroundColor: '#1976d2', color: '#fff', padding: '16px', textAlign: 'center' }}>
            <Typography variant="h6">Chat with OpenNest</Typography>
            <Typography variant="body2">How can I assist you today?</Typography>
          </Box>

          {/* Chat History */}
          <Box sx={{ flex: 1, padding: '16px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
            {chatHistory.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: chat.user === 'You' ? '#e0e0e0' : '#1976d2',
                  color: chat.user === 'You' ? '#000' : '#fff',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  marginY: '4px',
                  maxWidth: '80%',
                  alignSelf: chat.user === 'You' ? 'flex-end' : 'flex-start',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{chat.user}:</Typography>
                <Typography variant="body2">{chat.message}</Typography>
              </Box>
            ))}
          </Box>

          {/* Input Area */}
          <Box sx={{ padding: '16px', display: 'flex', gap: 1, backgroundColor: '#fff' }}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              fullWidth
              sx={{ flexGrow: 1 }}
            />
            <IconButton onClick={handleSendMessage} color="primary">
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Chatbot;
