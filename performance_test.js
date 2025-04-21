import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// Custom metrics
export let ResponseTime = new Trend('response_time'); // Total response time
export let Latency = new Trend('latency');           // Time to first byte (latency)
export let ErrorRate = new Rate('error_rate');       // Error rate
export let Requests = new Counter('total_requests'); // Total requests

export const options = {
    stages: [
        { duration: '30s', target: 10 }, // Ramp-up to 10 users over 30 seconds
        { duration: '1m', target: 10 },  // Stay at 10 users for 1 minute
        { duration: '30s', target: 0 },  // Ramp-down to 0 users over 30 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should complete below 500ms
        error_rate: ['rate<0.01'],        // Error rate should be less than 1%
    },
};

export default function () {
    const url = 'https://reqres.in/api/users';
    const params = {
        headers: {
            accept: 'application/json',
        },
    };

    // Send GET request
    const res = http.get(url, params);

    // Track metrics
    ResponseTime.add(res.timings.duration); // Record total response time
    Latency.add(res.timings.waiting);       // Record latency (time to first byte)
    Requests.add(1);                        // Increment request count
    ErrorRate.add(res.status !== 200);      // Record error if status is not 200

    // Validate response
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
        'response contains data': (r) => JSON.parse(r.body).data !== undefined,
    });

    sleep(1); // Simulate user think time
}