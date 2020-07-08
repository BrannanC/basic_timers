const timer = init_timer();

const [container] = document.getElementsByClassName("container");
const [display] = document.getElementsByClassName("display");
const btn_pause = document.querySelector(".control .pause");

function init_timer() {
  const timer = new Timer({
    on_start,
    on_end,
    on_update,
    on_pause,
    on_resume
  });

  return timer;
}

function start() {
  timer.start();
}

function stop() {
  timer.stop();
}

function pause() {
  timer.pause();
}

function resume() {
  timer.resume();
}

function reset() {
  display.textContent = "00:00:00:00";
  btn_pause.onclick = pause;
  btn_pause.textContent = "pause";
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
  reset();
}

function on_pause() {
  set_status(STATUS.PAUSED);
  btn_pause.onclick = resume;
  btn_pause.textContent = "resume";
}

function on_resume() {
  set_status(STATUS.RUNNING);
  btn_pause.onclick = pause;
  btn_pause.textContent = "pause";
}

function on_update() {
  display.textContent = timer.get_time();
}
