import https from 'k6/http';
import { sleep } from 'k6';

export default function () {
  https.get('https://localhost:3000');
  sleep(1);
}