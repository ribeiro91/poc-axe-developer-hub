const http = require('http');

const healthCheck = (url, maxAttempts = 30, interval = 1000) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    const check = () => {
      attempts++;
      console.log(`Health check attempt ${attempts}/${maxAttempts} for ${url}`);
      
      const req = http.get(url, (res) => {
        if (res.statusCode === 200) {
          console.log(`✓ Server is healthy at ${url}`);
          resolve();
        } else {
          console.log(`✗ Server responded with status ${res.statusCode}`);
          if (attempts < maxAttempts) {
            setTimeout(check, interval);
          } else {
            reject(new Error(`Server failed health check after ${maxAttempts} attempts`));
          }
        }
      });
      
      req.on('error', (err) => {
        console.log(`✗ Health check failed: ${err.message}`);
        if (attempts < maxAttempts) {
          setTimeout(check, interval);
        } else {
          reject(new Error(`Server health check failed after ${maxAttempts} attempts: ${err.message}`));
        }
      });
    };
    
    check();
  });
};

// If called directly, run health check
if (require.main === module) {
  const url = process.argv[2] || 'http://localhost:5050';
  healthCheck(url)
    .then(() => {
      console.log('Health check passed!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Health check failed:', err.message);
      process.exit(1);
    });
}

module.exports = healthCheck;
