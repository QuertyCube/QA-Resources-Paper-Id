# QA & Testing Resources for Paper.id – Manual, API, Performance, Bugs & Improvements

📄 **Test Cases, Bug Reports** can be accessed via the following Google Docs link:
[https://docs.google.com/document/d/11iok5RBSfgkJk4RpSzrUNzIS5lCMNII3viJjTSzK8Qw/edit?usp=sharing](https://docs.google.com/document/d/11iok5RBSfgkJk4RpSzrUNzIS5lCMNII3viJjTSzK8Qw/edit?usp=sharing)

---

This project focuses on testing the **functionality** and **performance** of the [Reqres API](https://reqres.in/), a public API for testing and prototyping purposes.

The assignment is divided into the following components:

- **API Functional Testing**: Verifies API behavior, including HTTP status codes, response structure, and data integrity.
- **Performance Testing**: Measures performance under load, capturing response time, latency, error rate, and throughput.

## API Testing 

**Purpose**: Validate the functionality of the Reqres API using the **Mocha** testing framework and **Chai** assertion library.

**Tests Include**:
- Verifying HTTP status code (200 OK).
- Validating response structure and schema.
- Checking that user data is present and array length is correct.

### 🧪 Installing Dependencies

Install the required dependencies:

```bash
npm init -y
npm install mocha chai axios --save-dev
```

### ▶️ Running the Tests

To run the API tests:

```bash
npm test
```

---

## Performance Testing

**Purpose**: Performance testing of the Reqres API using the k6 load testing tool.

**Metrics Captured**:
- Response Time: Total time taken to receive a response.
- Latency: Time to first byte.
- Error Rate: Percentage of requests that failed.
- Total Requests: Number of requests sent during the test.

**Test Configuration**:
- Simulates a ramp-up to 10 users, holds the load for 1 minute, and then ramps down.
- Ensures 95% of requests complete within 500ms and the error rate is below 1%.

### 🚀 Installing K6

Install `k6` using Homebrew (For Mac):

```bash
brew install k6
```

> Note: Make sure Homebrew is installed on your system.

### ▶️ Running the Performance Test

To run the performance test script:

```bash
k6 run performance_test.js
```

Ensure that your `performance_test.js` file is properly configured with the desired load testing setup.
