import { is_function } from "./util/type-checks.js";

class Timer {
  constructor(
    update_interval_rate = 10,
    on_start = null,
    on_end = null,
    on_update = null,
    on_resume = null
  ) {
    this.start_time = null;
    this.on_start = on_start;
    this.on_end = on_end;
    this.on_update = on_update;
    this.on_resume = on_resume;
    this.is_running = false;
    this.update_interval_rate = update_interval_rate;
    this.interval = null;
    this.paused_time = null;
    this.elapsed_time = 0;
  }

  start(time = Date.now()) {
    if (this.is_running && !this.paused_time) {
      return null;
    }

    // Resume function
    if (this.is_running && this.paused_time) {
      time = Date.now() - (this.paused_time - this.start_time);
      if (this.on_resume && is_function(this.on_resume)) {
        this.on_resume();
      }
      this.paused_time = null;
    }

    this.is_running = true;
    this.start_time = time;

    if (!this.paused_time) {
      if (this.on_start && is_function(this.on_start)) {
        this.on_start();
      }
    }

    this.interval = setInterval(() => {
      this.update();
    }, this.update_interval_rate);
  }

  update() {
    if (this.on_update && is_function(this.on_update)) {
      this.on_update();
    }

    this.elapsed_time = this.get_elapsed_time();
    return this.elapsed_time;
  }

  pause() {
    this.paused_time = Date.now();
    clearInterval(this.interval);
  }

  stop() {
    if (!this.is_running) {
      return null;
    }

    const end_time = this.get_elapsed_time();
    this.is_running = false;
    if (this.on_end && is_function(this.on_end)) {
      this.on_end();
    }
    this.start_time = null;
    clearInterval(this.interval);
    return end_time;
  }

  get_elapsed_time() {
    return this.start_time ? Date.now() - this.start_time : null;
  }
}

class FixedTimer extends Timer {
  constructor(duration, on_start, on_end, on_update, update_interval_rate) {
    super(on_start, on_end, on_update, update_interval_rate);
    this.duration = duration;
  }

  update() {
    this.elapsed_time = this.get_elapsed_time();
    if (this.elapsed_time >= this.duration) {
      this.stop();
    } else {
      if (this.on_update && is_function(this.on_update)) {
        this.on_update();
      }
    }

    return this.elapsed_time;
  }
}

export { Timer, FixedTimer };
