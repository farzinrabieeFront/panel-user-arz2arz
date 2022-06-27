// var days = Math.floor(distance / (1000 * 60 * 60 * 24));
// var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// var seconds = Math.floor((distance % (1000 * 60)) / 1000);

export const decodeTimeForTimer = (time) => {
  let days, hours, minutes, seconds;

  days = Math.floor(time / (24 * 60 * 60));
  hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
  minutes = Math.floor((time % (60 * 60)) / 60);
  seconds = Math.floor(time % 60);


  return { minutes, seconds };
};

// days = Math.floor(time / (24 * 3600));
//   hours = Math.floor((time % (24 * 3600)) / 3600);
//   minutes = Math.floor((time % (24 * 3600 * 3600)) / 60);
//   seconds = Math.floor((time % (24 * 3600 * 3600 * 60)) / 60);
