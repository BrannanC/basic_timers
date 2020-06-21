const original_date_now = Date.now;

export function advance_timer(by) {
  jest.advanceTimersByTime(by);
  const now = original_date_now();
  Date.now = function () {
    return now + by;
  };
}

export function restore_date_now() {
  Date.now = original_date_now;
}
