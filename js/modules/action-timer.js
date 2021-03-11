function actionTimer() {
  // Timer

  const deadline = new Date("2021,03,12");
  const date = deadline - new Date();

  const actionDays = document.querySelector("#days"),
    actionHours = document.querySelector("#hours"),
    actionMinutes = document.querySelector("#minutes"),
    actionSeconds = document.querySelector("#seconds");

  function parseDate() {
    const t = deadline - new Date();
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    const time = {
      difference: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
    return time;
  }

  setActionTimer(parseDate());

  const timer = setInterval(() => {
    setActionTimer(parseDate());
  }, 1000);

  function setActionTimer(t) {
    actionDays.textContent = setZero(t.days);
    actionHours.textContent = setZero(t.hours);
    actionMinutes.textContent = setZero(t.minutes);
    actionSeconds.textContent = setZero(t.seconds);
  }

  function setZero(t) {
    if (t < 10) {
      return `0${parseInt(t)}`;
    }
    return t;
  }
}

export default actionTimer;
