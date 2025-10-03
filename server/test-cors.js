// Simple CORS test script
const fetch = require('node-fetch');

async function testCORS() {
    console.log('Testing CORS configuration...\n');
    
    const testOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'http://localhost:8000',
        'http://localhost:8080'
    ];
    
    for (const origin of testOrigins) {
        try {
            console.log(`Testing origin: ${origin}`);
            
            const response = await fetch('http://localhost:5000/api/cors-test', {
                method: 'GET',
                headers: {
                    'Origin': origin,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(`✅ ${origin} - Success: ${data.message}`);
            } else {
                console.log(`❌ ${origin} - Failed: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.log(`❌ ${origin} - Error: ${error.message}`);
        }
        console.log('');
    }
}

// Run the test
testCORS().catch(console.error);
