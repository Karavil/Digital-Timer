class Timer {
   constructor(startTimeMS, maxTimeMS, semiColon, digit1, digit2, digit3, digit4) {
      console.log('Timer constructed');
      this.currentMS = startTimeMS;
      this.maxTimeMS = maxTimeMS;
      this.digits = [semiColon, digit1, digit2, digit3, digit4];

      //Used by button to stop the timer
      this.stopTimer = false;

      //Update the timer at the start to current value
      this.updateDigits(this.currentMS);
   }

   increaseTimer(durationMS) {
      this.currentMS += durationMS;
      this.updateDigits();
      return this.currentMS;
   }

   updateDigits() {
      let tempCurrentMS = this.currentMS;
      if (this.currentMS >= this.maxTimeMS) {
         this.digits.forEach((digit) => digit.classList.add('hit-max'));
         tempCurrentMS = this.maxTimeMS;
      }

      let tenThousands = Math.floor(tempCurrentMS / 10000);
      this.digits[1].textContent = tenThousands;
      tempCurrentMS -= tenThousands * 10000;

      let thousands = Math.floor(tempCurrentMS / 1000);
      this.digits[2].textContent = thousands;
      tempCurrentMS -= thousands * 1000;

      let hundreds = Math.floor(tempCurrentMS / 100);
      this.digits[3].textContent = hundreds;
      tempCurrentMS -= hundreds * 100;

      let tens = Math.floor(tempCurrentMS / 10);
      this.digits[4].textContent = tens;
      tempCurrentMS -= tens * 10;
   }

   startTimer(incrementMS = 10, startButton) {
      this.stopTimer = false;
      startButton.disabled = true;

      const interval = setInterval(() => {
         if (this.currentMS > this.maxTimeMS || this.stopTimer) {
            clearInterval(interval);
            startButton.disabled = false;
         } else {
            this.increaseTimer(incrementMS);
         }
      }, incrementMS);
   }

   resetTimer(resetMS = 0, startButton) {
      this.currentMS = resetMS;
      this.updateDigits(this.currentMS);
      this.stopTimer = true;
      this.digits.forEach((digit) => digit.classList.remove('hit-max'));
      startButton.disabled = false;
   }
}

const secondTens = document.getElementById('secondTens');
const secondOnes = document.getElementById('secondOnes');
const semiColon = document.getElementById('colon');
const msHundreds = document.getElementById('msHundreds');
const msTens = document.getElementById('msTens');

const maxTimeMS = 10000;

const myTimer = new Timer(0, maxTimeMS, semiColon, secondTens, secondOnes, msHundreds, msTens);

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

startButton.addEventListener("click", function () {
   myTimer.resetTimer(0, startButton);
   myTimer.startTimer(10, startButton);
});

resetButton.addEventListener("click", function () {
   myTimer.resetTimer(0, startButton);
});
