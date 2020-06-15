import { Timer } from "./timer.js";
import { is_function } from "./util/type-check.js";

class IntervalTime extends Timer {
  _completed_intervals = [];
  last_completed_elapsed_time = 0;
  constructor(
    on_complete_interval,
    on_start,
    on_end,
    on_update,
    update_interval_rate
  ) {
    super(on_start, on_end, on_update, update_interval_rate);
    this.on_complete_interval = on_complete_interval;
  }

  get completed_intervals() {
    return this._completed_intervals;
  }

  set completed_intervals(value) {
    this._completed_intervals.push(value);
  }

  get completed_interval() {
    if(!this.elapsed_time){
      throw Error("Start Timer First");
    }
    return this.elapsed_time - this.last_completed_elapsed_time;
  }

  update_completed_intervals() {
    this.completed_intervals = this.completed_interval;
  }

  update_last_completed_elapsed_time() {
    this.last_completed_elapsed_time = this.elapsed_time;
  }

  invoke_on_complete_interval() {
    if (is_function(this.on_complete_interval)) {
      this.on_complete_interval();
    }
  }
  
  complete_interval() {
    this.update_completed_intervals();
    this.update_last_completed_elapsed_time();
    this.invoke_on_complete_interval();
  }

  retrieve_all_completed_intervals() {
    this.completed_intervals.forEach((e, i) =>
      console.log(`Set ${i + 1}: ${e}`)
    );
  }
}

function on_start() {
  console.log("start");
}

function on_end() {
  console.log("end");
}

function on_update() {
  //   console.log("update");
}

function on_complete_interval() {
  console.count("Completed count");
}

const it = new IntervalTime(on_complete_interval, on_start, on_end, on_update);

it.start();

const interval_id = setInterval(() => {
  it.complete_interval();
}, 3 * 1000);

setTimeout(() => {
  clearInterval(interval_id);
  it.stop();
  it.retrieve_all_completed_intervals();
}, 10 * 1000);
