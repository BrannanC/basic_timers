import { Timer } from "./timer.js";
import { advance_timer, restore_date_now } from "./util/testing-tools.js";
import { convert_to_sec } from "./util/time-conversion.js";
// testing reference
// https://jestjs.io/docs/en/getting-started.html
// https://www.robinwieruch.de/node-js-jest
// https://devhints.io/jest

describe("timer.js", () => {
  describe("Timer class", () => {
    jest.useFakeTimers();
    const on_complete_interval = jest.fn();
    const on_start = jest.fn();
    const on_end = jest.fn();
    const on_update = jest.fn();
    const timer = new Timer(on_start, on_end, on_update);

    const advance_time = 10 * 1000;
    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      restore_date_now();
    });

    it("should be instantiated", () => {
      expect(timer).toBeInstanceOf(Timer);
    });

    it("should be running", () => {
      timer.start();

      expect(timer.is_running).toBe(true);
      timer.stop();
    });

    it("should be invoking on_start", () => {
      timer.start();
      expect(timer.is_running).toBe(true);
      expect(timer.paused_time).toBeNull();
      expect(timer.on_start).toBeCalled();
      expect(timer.on_start).toHaveBeenCalledTimes(1);
      timer.stop();
    });

    it("should be invoking on_update", () => {
      timer.start();
      advance_timer(advance_time);
      expect(timer.on_update).toBeCalled();
      expect(timer.on_update).toHaveBeenCalledTimes(
        advance_time / timer.update_interval_rate
      );
      timer.stop();
    });

    it("should be paused", () => {
      timer.start();
      advance_timer(advance_time);
      timer.pause();
      expect(timer.is_running).toBe(true);
      expect(timer.paused_time).toBeTruthy();
      timer.stop();
    });

    it("should be resumed", () => {
      timer.start();
      advance_timer(advance_time);
      timer.pause();
      advance_timer(advance_time);
      timer.resume();
      expect(timer.paused_time).toBeNull();
      timer.stop();
    });

    it("should be stopped", () => {
      timer.start();
      advance_timer(advance_time);
      const end_time = timer.stop();
      expect(timer.is_running).toBe(false);
      expect(timer.start_time).toBeNull();
      expect(convert_to_sec(end_time)).toBe(convert_to_sec(advance_time));
    });

    it("should be returning elapsed time", () => {
      timer.start();
      advance_timer(advance_time);
      const elapsed_time = timer.get_elapsed_time();
      expect(convert_to_sec(elapsed_time)).toBe(convert_to_sec(advance_time));
    });
  });
});
