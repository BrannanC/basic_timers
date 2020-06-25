import { is_function } from "./util/index.js";

class Timer {
  // constructor(props = {}) {
  //   this.start_time = null;
  //   this.on_start = props.on_start || null;
  //   this.on_end = props.on_end || null;
  //   this.on_update = props.on_update || null;
  //   this.on_resume = props.on_resume || null;
  //   this.on_pause = props.on_pause || null;
  //   // this.is_running = false;
  //   this.update_interval_rate = props.update_interval_rate || 10;
  //   this.interval = null;
  //   this.paused_time = null;
  //   this.elapsed_time = 0;
  // }

  constructor({
    on_start = null,
    on_end = null,
    on_update = null,
    on_resume = null,
    on_pause = null,
    update_interval_rate = 10,
  } = {}) {
    this.start_time = null;
    this.on_start = on_start;
    this.on_end = on_end;
    this.on_update = on_update;
    this.on_resume = on_resume;
    this.on_pause = on_pause;
    this.update_interval_rate = update_interval_rate;
    this.interval = null;
    this.paused_time = null;
    this.elapsed_time = 0;
  }

  get is_running() {
    return this.start_time && !this.paused_time;
  }

  get is_not_running() {
    return !(this.start_time && !this.paused_time);
  }
  get is_paused() {
    return this.start_time && this.paused_time;
  }

  get is_not_paused() {
    return !(this.start_time && this.paused_time);
  }

  start(time = Date.now()) {
    // if (this.is_running && !this.paused_time) {
    if (this.start_time) {
      return null;
    }

    // Resume function
    // if (this.is_running && this.paused_time) {
    // if (this.is_paused) {
    //   time = Date.now() - (this.paused_time - this.start_time);
    //   this.paused_time = null;
    // }

    // this.is_running = true;
    this.start_time = time;

    // if (!this.paused_time) {
    if (this.on_start && is_function(this.on_start)) {
      this.on_start();
    }
    // }

    this.set_interval();
  }

  update() {
    if (this.on_update && is_function(this.on_update)) {
      this.on_update();
    }

    this.elapsed_time = this.get_elapsed_time();

    return this.elapsed_time;
  }

  resume() {
    if (this.is_not_paused) {
      return null;
    }

    if (this.on_resume && is_function(this.on_resume)) {
      this.on_resume();
    }

    const time = Date.now() - (this.paused_time - this.start_time);
    this.start_time = time;
    this.paused_time = null;

    this.set_interval();
  }

  pause() {
    if (this.is_not_running) {
      return null;
    }

    this.paused_time = Date.now();
    if (this.on_pause && is_function(this.on_pause)) {
      this.on_pause();
    }

    this.clear_interval();
  }

  stop() {
    if (!this.start_time) {
      return null;
    }

    const end_time = this.get_elapsed_time();
    this.elapsed_time = end_time;
    // this.is_running = false;
    if (this.on_end && is_function(this.on_end)) {
      this.on_end();
    }
    this.start_time = null;
    this.paused_time = null;
    this.clear_interval();
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

  set_interval() {
    this.interval = setInterval(() => {
      this.update();
    }, this.update_interval_rate);
  }

  clear_interval() {
    clearInterval(this.interval);
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
