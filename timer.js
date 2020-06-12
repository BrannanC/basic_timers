class Timer {
  constructor(
    on_start = null,
    on_end = null,
    on_update,
    update_interval_rate = 10
  ) {
    this.start_time = null;
    this.on_start = on_start;
    this.on_end = on_end;
    this.is_running = false;
    this.on_update = on_update;
    this.update_interval_rate = update_interval_rate;
    this.interval = null;
    this.paused_time = null;
  }

  start(time = Date.now()) {
    if (this.is_running && !this.paused_time) {
      return null;
    }

    this.is_running = true;
    this.start_time = time;
    this.on_start();

    this.interval = setInterval(() => {
      this.update();
    }, this.update_interval_rate);
  }

  update() {
    this.on_update();
  }

  pause() {
    this.paused_time = Date.now();
    clearInterval(this.interval);
  }

  resume() {
    this.start(Date.now() - (this.paused_time - this.start_time));
    this.paused_time = null;
  }

  stop() {
    if (!this.is_running) {
      return null;
    }

    const end_time = this.get_elapsed_time();
    this.is_running = false;
    this.on_end();
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
    const elapsed_time = this.get_elapsed_time();
    if (elapsed_time >= this.duration) {
      this.stop();
    } else {
      this.on_update();
    }
  }
}
