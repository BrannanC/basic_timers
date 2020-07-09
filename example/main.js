import { Timer } from "basic_timers";

const timer = init_timer();

const [container] = document.getElementsByClassName("container");
const [display] = document.getElementsByClassName("display");

const pause = document.querySelector(".control .pause");
pause.onclick = () => timer.pause();

const start = document.querySelector(".control .start");
start.onclick = () => timer.start();

const stop = document.querySelector(".control .stop");
stop.onclick = () => timer.stop();

function init_timer() {
  const timer = new Timer({
    on_start,
    on_end,
    on_update,
    on_pause,
    on_resume,
  });
  return timer;
}

const STATUS = { RUNNING: "running", STOPPED: "stopped", PAUSED: "paused" };
function remove_all_status() {
  container.classList.remove(...Object.values(STATUS));
}

function set_status(status) {
  remove_all_status();
  container.classList.add(status);
}

function on_start() {
  set_status(STATUS.RUNNING);
}

function on_end() {
  set_status(STATUS.STOPPED);
  display.textContent = "0";
  pause.onclick = () => timer.pause();
  pause.textContent = "pause";
}

function on_pause() {
  set_status(STATUS.PAUSED);
  pause.onclick = () => timer.resume();
  pause.textContent = "resume";
}

function on_resume() {
  set_status(STATUS.RUNNING);
  pause.onclick = () => timer.pause();
  pause.textContent = "pause";
  console.dir(pause);
}

function on_update() {
  display.textContent = timer.get_time();
}
