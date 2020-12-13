import {Component, ViewEncapsulation} from '@angular/core';
import Keyboard from "simple-keyboard";
import Layout from "simple-keyboard-layouts/build/layouts/russian"

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss', "../../../node_modules/simple-keyboard/build/css/index.css"]
})
export class TrainComponent {
  value = "";
  keyboard: Keyboard;
  errorCount = 0;
  exercise: string = "тест тест тест тест";
  symbolCount: number = 0;


  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      disableButtonHold: true,
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightPress: true,
      layout: Layout,
      buttonTheme: [
        {
          class: "zone1",
          buttons: "5 6 7 к е н г а п р о м и т ь"
        },
        {
          class: "zone2",
          buttons: "4 8 у ш в л с б"
        },
        {
          class: "zone3",
          buttons: "3 9 ц щ ы д ч ю"
        },
        {
          class: "zone4",
          buttons: "1 2 0 - = й з х ъ ф ж э я /"
        },
        {
          class: "space",
          buttons: "{space}"
        }
      ]
    });
  }

  changeColor() {
    if (this.exercise[0] == " ") {
      this.keyboard.removeButtonTheme("{space}", "nextChar");
    } else this.keyboard.removeButtonTheme(this.exercise[0], "nextChar");
    this.exercise = this.exercise.substring(1);
    if (this.exercise[0] == " ") {
      this.keyboard.addButtonTheme("{space}", "nextChar");
    } else this.keyboard.addButtonTheme(this.exercise[0], "nextChar");
  }
  speed:string = "0";
  seconds: number = 0;
  minutes: number = 0;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds < 59) {
        this.seconds++;
        this.speed = (this.symbolCount / (this.minutes * 60 + this.seconds)).toFixed(2);
      } else {
        this.minutes++;
        this.seconds = 0;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  onKeyPress = (button: string) => {
    if (this.exercise.length > 0 && this.exercise[0] != button.replace("{space}", " ")) {
      this.errorCount++;
    }
    this.changeColor();
    this.symbolCount++;
    if (this.exercise.length === 0) this.pauseTimer();
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();

  }


  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }

  start() {
    this.pauseTimer();
    console.log("1");
    this.startTimer();
    this.keyboard.addButtonTheme(this.exercise[0], "nextChar");
    this.keyboard.setOptions({onKeyPress: button => this.onKeyPress(button)});
  }

  hidden = false;
}
