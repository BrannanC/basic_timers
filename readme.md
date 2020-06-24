# Basic timers

```console
npm i basic_timers
```

### Timer Class

Runs indefinitely until `end()` method is executed.

##### Parameters:

| Property Name        | type     | description                                    | default |
| -------------------- | -------- | ---------------------------------------------- | ------- |
| on_start             | Function | Function to be ran when timer starts           | null    |
| on_end               | Function | Function to be ran when timer ends             | null    |
| on_update            | Function | Function to be ran every time timer updates    | null    |
| on_pause             | Function | Function to be ran every time timer is paused  | null    |
| on_resume            | Function | Function to be ran every time timer is resumed | null    |
| update_interval_rate | int      | Milliseconds between checking for update       | 10      |

```javascript
const on_start = () => console.log("start");
const on_end = () => console.log("end");
const timer = new Timer({
  on_start,
  on_end,
  update_interval_rate: 100,
});
```

| Method           | description            |
| ---------------- | ---------------------- |
| timer.start()    | Starts timer           |
| timer.pause()    | Pauses timer           |
| timer.resume()   | Resumes a paused timer |
| timer.end()      | Ends timer             |
| timer.get_time() | Get total time elapsed |

### FixedTimer Class

Runs for a fixed duration or until `end()` method is called.

##### Parameters: Extends Timer Class

| Property Name | type | description                                                           | default  |
| ------------- | ---- | --------------------------------------------------------------------- | -------- |
| duration      | int  | Milliseconds timer will run until timer.end() is called automatically | required |

```javascript
const on_start = () => console.log("start");
const on_end = () => console.log("end");
const timer = new FixedTimer({
  on_start,
  on_end,
  duration: 1000 * 20,
  update_interval_rate: 100,
});
// timer will run for 20 seconds
```

### IntervalTimer Class

Runs indefinitely and times intervals.

##### Parameters: Extends Timer Class

| Property Name        | type     | description                                      | default |
| -------------------- | -------- | ------------------------------------------------ | ------- |
| on_complete_interval | Function | Function to be run when an interval is completed | null    |

```javascript
const on_start = () => console.log("start");
const on_end = () => console.log("end");
const on_complete_interval = () => console.log("interval completed");
const timer = new IntervalTimer({
  on_start,
  on_end,
  on_complete_interval,
  duration: 1000 * 20,
  update_interval_rate: 100,
});
for (let i = 1; i < 4; i++) {
  setTimeout(() => timer.complete_interval(), i * 2000);
}
console.log(timer.get_all_completed_intervals());
```

| Method                              | description                                                 |
| ----------------------------------- | ----------------------------------------------------------- |
| timer.complete_interval()           | Adds total time for interval to list of completed intervals |
| timer.get_all_completed_intervals() | Gets list of all completed intervals                        |
