// Chat Assistant Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chat elements
    const chatButton = document.querySelector('.chat-button');
    const chatWindow = document.querySelector('.chat-window');
    const closeChat = document.querySelector('.close-chat');
    const sendButton = document.querySelector('.send-button');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    const typingIndicator = document.createElement('div');
    
    // Create typing indicator
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    
    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });
    
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (chatWindow.classList.contains('active') && 
            !chatWindow.contains(e.target) && 
            !chatButton.contains(e.target)) {
            chatWindow.classList.remove('active');
        }
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Show typing indicator
            chatMessages.appendChild(typingIndicator);
            typingIndicator.style.display = 'flex';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate API call delay
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.style.display = 'none';
                
                // Generate bot response (replace with actual API call)
                const botResponse = generateBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1500);
        }
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Generate bot response (simulated API response)
    function generateBotResponse(message) {
        message = message.toLowerCase();
        
        // Product inquiries
        if (message.includes('phone') || message.includes('smartphone')) {
            return "We have the latest smartphones from Apple, Samsung, and Google. Which brand are you interested in?";
        } else if (message.includes('laptop')) {
            return "Our laptop collection includes gaming laptops, ultrabooks, and business laptops. What's your primary use case?";
        } else if (message.includes('headphone')) {
            return "We offer wireless headphones, noise-cancelling models, and gaming headsets. Are you looking for any specific features?";
        } else if (message.includes('watch') || message.includes('smartwatch')) {
            return "We have smartwatches from Apple, Samsung, and Fitbit. Would you like fitness tracking or smartphone integration?";
        }
        
        // Price inquiries
        else if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            return "Our prices are very competitive. Which product are you interested in? I can give you specific pricing.";
        }
        
        // Shipping inquiries
        else if (message.includes('shipping') || message.includes('delivery')) {
            return "We offer free shipping on orders over $99. Standard delivery takes 3-5 business days. Express shipping is available for an additional fee.";
        } else if (message.includes('free shipping')) {
            return "Yes, we offer free standard shipping on all orders over $99. For orders below $99, shipping is $5.99.";
        }
        
        // Return policy
        else if (message.includes('return') || message.includes('exchange')) {
            return "We have a 30-day return policy for unused products in original packaging. Do you need help with a return?";
        }
        
        // Payment options
        else if (message.includes('payment') || message.includes('pay') || message.includes('credit card')) {
            return "We accept all major credit cards, PayPal, and Apple Pay. We also offer financing options for purchases over $499.";
        }
        
        // Discounts and promotions
        else if (message.includes('discount') || message.includes('promo') || message.includes('coupon')) {
            return "We currently have a summer sale with up to 30% off selected items. Use code SUMMER23 at checkout for an extra 10% off!";
        }
        
        // General greetings
        else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! How can I assist you with your shopping today?";
        } else if (message.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        // Default response
        else {
            const responses = [
                "I'm here to help with your shopping needs. You can ask me about products, prices, shipping, or returns!",
                "How can I assist you with your shopping today?",
                "I can help you find products, check availability, or answer questions about our store.",
                "Feel free to ask me about any of our products or services!"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    // Initialize with welcome message if chat is empty
    if (chatMessages.children.length <= 2) {
        addMessage("Hi there! 👋 I'm your shopping assistant. How can I help you today?", 'bot');
        addMessage("I can help you find products, check availability, or answer questions about our store.", 'bot');
    }
    
    // API Integration Example (commented out for now)
    /*
    async function callChatAPI(message) {
        try {
            const response = await fetch('https://api.example.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error calling chat API:', error);
            return "I'm having trouble connecting right now. Please try again later.";
        }
    }
    */
});