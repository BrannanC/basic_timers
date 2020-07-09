import Timer from "basic_timers";

const timer = init_timer();

const [container] = document.getElementsByClassName("container");
const [display] = document.getElementsByClassName("display");
const pause = document.querySelector(".control .pause");

function init_timer() {
  console.log(on_start, "start");
  const timer = new Timer({
    on_start,
    on_end,
    on_update,
  });

  return (() => {
    return timer;
  })();
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
  console.log("start");
  set_status(STATUS.RUNNING);
}

function on_end() {
  set_status(STATUS.STOPPED);
  display.textContent = "0";
  pause.onclick = on_pause;
  pause.textContent = "pause";
}

function on_pause() {
  if (timer.is_running && !timer.paused_time) {
    set_status(STATUS.PAUSED);
    pause.onclick = on_resume;
    timer.pause();
    pause.textContent = "resume";
  }
}

function on_resume() {
  set_status(STATUS.RUNNING);
  pause.onclick = on_pause;
  timer.resume();
  pause.textContent = "pause";
}

function on_update() {
  display.textContent = timer.get_time();
}
