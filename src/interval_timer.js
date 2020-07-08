import { Timer } from "./timer.js";
import { is_function } from "./util/index.js";

class IntervalTimer extends Timer {
  constructor(props = {}) {
    super(props);
    this.on_complete_interval = props.on_complete_interval || null;
    this._completed_intervals = [];
    this.last_completed_elapsed_time = 0;
  }

  get completed_intervals() {
    return this._completed_intervals;
  }

  set completed_intervals(value) {
    this._completed_intervals.push(value);
  }

  get_completed_interval() {
    return this.elapsed_time - this.last_completed_elapsed_time;
  }

  update_completed_intervals() {
    this.completed_intervals = this.get_completed_interval();
  }

  update_last_completed_elapsed_time() {
    this.last_completed_elapsed_time = this.elapsed_time;
  }

  invoke_on_complete_interval() {
    if (this.on_complete_interval && is_function(this.on_complete_interval)) {
      this.on_complete_interval();
    }
  }

  can_complete_interval() {
    return this.elapsed_time && this.is_running ? true : false;
  }

  complete_interval() {
    if (!this.can_complete_interval()) {
      return null;
    }
    this.update_completed_intervals();
    this.update_last_completed_elapsed_time();
    this.invoke_on_complete_interval();
  }

  get_all_completed_intervals() {
    return this.completed_intervals;
  }
}

export { IntervalTimer };
