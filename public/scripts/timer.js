const timer = function() {
  let startTime = 1000 * 60 * 5;
  setInterval(()=>{
    let currentTime = Date.now();
    let remainingTime = currentTime - startTime;
  },1000);
};
