import React, { useState } from 'react';

const Contact = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return alert('Please enter a message');
    console.log('send message', message);
    setMessage('');
  };

  return (
    <div className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
      <h2 className="text-3xl font-bold mb-2">Leave A Message For Us</h2>
      <p className="text-sm text-gray-400 mb-8">Get in touch with Rockie</p>

      <div className="w-full max-w-3xl">
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          className="w-full rounded-md border border-gray-200 p-4 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <button
          onClick={handleSend}
          className="w-full bg-red-500 text-white py-3 rounded-full font-medium hover:bg-red-600"
        >
          Send message
        </button>
      </div>
    </div>
  );
};

export default Contact;