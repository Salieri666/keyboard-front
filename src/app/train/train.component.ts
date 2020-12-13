import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Keyboard from "simple-keyboard";
import Layout from "simple-keyboard-layouts/build/layouts/russian"
import {AuthserviceService} from "../auth/authservice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Exercise} from "../models/exercise";
import {ExerciseService} from "../services/exercise.service";
import {DifficultyService} from "../services/difficulty.service";
import {Difficulty} from "../models/difficulty";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss', "../../../node_modules/simple-keyboard/build/css/index.css"]
})
export class TrainComponent implements OnInit {
  value = "";
  keyboard: Keyboard;
  errorCount: number = 0;
  maxErrors: number;
  exWords: string;
  symbolCount: number = 0;
  allSymbols: number;
  id: number;
  timePress: number;

  ngOnInit() {
    if (!this.auth.islogin)
      this.router.navigate(['/login']);
    else {
      this.httpExService.getID(this.id).subscribe((data: Exercise) => {
        this.exWords = data.words;
        this.allSymbols = this.exWords.length;
        this.httpDiffService.getID(data.levelId).subscribe((data: Difficulty) => {
          this.maxErrors = data.maxErrors;
          this.timePress = data.timePress;
        });
      });

    }
  }

  constructor(private auth: AuthserviceService, private httpDiffService: DifficultyService, private activateRoute: ActivatedRoute, private httpExService: ExerciseService,
              private router: Router) {
    this.id = activateRoute.snapshot.params['id'];
  }

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
    if (this.exWords[0] == " ") {
      this.keyboard.removeButtonTheme("{space}", "nextChar");
    } else this.keyboard.removeButtonTheme(this.exWords[0], "nextChar");
    this.exWords = this.exWords.substring(1);
    if (this.exWords[0] == " ") {
      this.keyboard.addButtonTheme("{space}", "nextChar");
    } else this.keyboard.addButtonTheme(this.exWords[0], "nextChar");
  }

  speed: string = "0";
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

  pressInterval;
  timePassed: boolean;

  pressTimer() {
    this.pressInterval = setInterval(() => {
      this.errorCount++;
      if (this.exWords.length === 0 || this.errorCount > this.maxErrors) {
        this.pauseTimer();
        this.stopPressTimer();
        this.keyboard.setOptions({onKeyPress: null})
        //send stat
      }
      this.changeColor();
    }, this.timePress * 1000);
  }

  stopPressTimer() {
    clearInterval(this.pressInterval);
  }

  onKeyPress = (button: string) => {

    if (this.exWords.length > 0 && this.exWords[0] != button.replace("{space}", " ")) {
      this.errorCount++;
    }
    this.changeColor();
    this.symbolCount++;
    if (this.exWords.length === 0 || this.errorCount > this.maxErrors) {
      this.pauseTimer();
      this.stopPressTimer();
      this.keyboard.setOptions({onKeyPress: null})
      //send stat
    }
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
    this.stopPressTimer();
    this.pressTimer();
  }


  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }

  start() {
    this.startTimer();
    this.pressTimer();
    this.keyboard.addButtonTheme(this.exWords[0], "nextChar");
    this.keyboard.setOptions({onKeyPress: button => this.onKeyPress(button)});
  }

  hidden = false;
}
