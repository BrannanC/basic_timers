import { is_function } from "./util/type-checks.js";

class Timer {
  constructor(props = {}) {
    this.start_time = null;
    this.on_start = props.on_start || null;
    this.on_end = props.on_end || null;
    this.on_update = props.on_update || null;
    this.on_resume = props.on_resume || null;
    this.on_pause = props.on_pause || null;
    this.is_running = false;
    this.update_interval_rate = props.update_interval_rate || 10;
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

  resume() {
    if (this.on_resume && is_function(this.on_resume)) {
      this.on_resume();
    }
    this.start();
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
    this.elapsed_time = end_time;
    this.is_running = false;
    if (this.on_end && is_function(this.on_end)) {
      this.on_end();
    }
    this.start_time = null;
    clearInterval(this.interval);
    return end_time;
  }

  get_elapsed_time() {
    // Private function to calculate elapsed time
    return this.start_time ? Date.now() - this.start_time : null;
  }

  get_time() {
    // Public function to return elapsed time
    return this.elapsed_time;
  }
}

class FixedTimer extends Timer {
  constructor(props) {
    super(props);
    if (!props || !props.duration) {
      throw new Error("FixedTimer requires a duration");
    }
    this.duration = props.duration;
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
