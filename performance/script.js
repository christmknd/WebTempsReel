import http from 'k6/http';
import { check, sleep } from 'k6';

//load testing
export let options = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '30s', target: 10 },
    { duration: '15s', target: 0 },
  ],
};


export default function () {
  let res = http.get('http://host.docker.internal:3000');
  check(res, { 'status was 200': r => r.status == 200 });
  sleep(1);
}