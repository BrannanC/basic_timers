# Basic timers

basic_timers provides timers that run like a stopwatch. Can be used in any JavaScript project where timers are needed.

### Installation

To install the most recent stable version:

##### Using NPM:

```console
npm i basic_timers
```

### Types of Timers

<details>
<summary>Timer</summary>

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

| Method / Attribute | description                                    |
| ------------------ | ---------------------------------------------- |
| timer.start()      | Starts timer                                   |
| timer.pause()      | Pauses timer                                   |
| timer.resume()     | Resumes a paused timer                         |
| timer.end()        | Ends timer                                     |
| timer.get_time()   | Get total time elapsed                         |
| is_running         | Checks if timer is running and returns boolean |
| is_paused          | Check if timer is paused and returns boolean   |

</details>

<details>
<summary>FixedTimer</summary>

Runs for a fixed duration or until `end()` method is called.

##### Parameters: Extends Timer Class

| Property Name | type | description                                                           | default  |
| ------------- | ---- | --------------------------------------------------------------------- | -------- |
| on_start             | Function | Function to be ran when timer starts           | null    |
| on_end               | Function | Function to be ran when timer ends             | null    |
| on_update            | Function | Function to be ran every time timer updates    | null    |
| on_pause             | Function | Function to be ran every time timer is paused  | null    |
| on_resume            | Function | Function to be ran every time timer is resumed | null    |
| update_interval_rate | int      | Milliseconds between checking for update       | 10      |
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
| Method / Attribute | description                                    |
| ------------------ | ---------------------------------------------- |
| timer.start()      | Starts timer                                   |
| timer.pause()      | Pauses timer                                   |
| timer.resume()     | Resumes a paused timer                         |
| timer.end()        | Ends timer                                     |
| timer.get_time()   | Get total time elapsed                         |
| is_running         | Checks if timer is running and returns boolean |
| is_paused          | Check if timer is paused and returns boolean   |

</details>

<details>
<summary>IntervalTimer</summary>

Runs indefinitely and times intervals.

##### Parameters: Extends Timer Class

| Property Name        | type     | description                                      | default |
| -------------------- | -------- | ------------------------------------------------ | ------- |
| on_start             | Function | Function to be ran when timer starts           | null    |
| on_end               | Function | Function to be ran when timer ends             | null    |
| on_update            | Function | Function to be ran every time timer updates    | null    |
| on_pause             | Function | Function to be ran every time timer is paused  | null    |
| on_resume            | Function | Function to be ran every time timer is resumed | null    |
| update_interval_rate | int      | Milliseconds between checking for update       | 10      |
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
| timer.start()      | Starts timer                                   |
| timer.pause()      | Pauses timer                                   |
| timer.resume()     | Resumes a paused timer                         |
| timer.end()        | Ends timer                                     |
| timer.get_time()   | Get total time elapsed                         |
| is_running         | Checks if timer is running and returns boolean |
| is_paused          | Check if timer is paused and returns boolean   |
| timer.complete_interval()           | Adds total time for interval to list of completed intervals |
| timer.get_all_completed_intervals() | Gets list of all completed intervals                        |

</details>

### Examples
Here's [very basic example](https://epic-nightingale-93ae06.netlify.app/) in action. You can see the code [here](https://github.com/BrannanC/basic_timers/tree/development/example). If you would like to add a project too this section feel free to make a PR or contact us.

### Contributing

First of all, thank you! We appreciate the contribution!

When contributing to this repository, please first discuss the change you wish to make via issue,
email, slack or any other method with the owners of this repository before making a change.

Please [create an issue](https://github.com/BrannanC/basic_timers/issues/new) if you would like to request a feature or report a bug.

## License

MIT
