import { Timer } from "./timer.js";

class IntervalTime extends Timer {
  completed_intervals = [];
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

  complete_interval() {
    const elapsed_time = this.get_elapsed_time();

    if (!elapsed_time) {
      throw Error("Start timer first");
    }

    this.completed_intervals.push(
      elapsed_time - this.last_completed_elapsed_time
    );
    this.last_completed_elapsed_time = elapsed_time;

    if (typeof this.on_complete_interval === "function") {
      this.on_complete_interval();
    }
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
