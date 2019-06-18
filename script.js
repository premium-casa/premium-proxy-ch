import { check, sleep } from "k6";
import http from "k6/http";


let desiredRPS = 500; // total RPS for the test
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
let RPSperVU = 10;

let VUsRequired = Math.round(desiredRPS/RPSperVU);

export let options = {
	vus: VUsRequired,
  duration: '5m',
};

export default function() {

	let res = http.get(`http://localhost:3000/photos/${randomNum(1, 10000000)}`);
	check(res, {
		"success": (r) => r.status == 200,
	})
}
