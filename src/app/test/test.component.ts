import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Keyboard from "simple-keyboard";
import {Exercise} from "../models/exercise";
import {AuthserviceService} from "../auth/authservice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from "../services/exercise.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss', '../../../node_modules/simple-keyboard/build/css/index.css']
})
export class TestComponent implements OnInit {
  value = '';
  keyboard: Keyboard;
  errorCount: number = 0;
  maxErrors: number = 10;
  exWords: string;
  symbolCount: number = 0;
  allSymbols: number;
  id: number = 9997;
  timePress: number = 3;

  OK() {
    this.router.navigate(['/help']); //main
  }

  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.httpExService.getID(this.id).subscribe((data: Exercise) => {
        this.exWords = data.words;
        this.allSymbols = this.exWords.length;
      });
    }
  }


  constructor(private auth: AuthserviceService,
              private activateRoute: ActivatedRoute, private httpExService: ExerciseService, private httpUserService: UserService,
              private router: Router) {
  }

  ngOnDestroy(){
    this.pauseTimer();
    this.stopPressTimer();
    this.keyboard.destroy();
  }
  ngAfterViewInit() {

    const russian = {
      default: [
        "\u0451 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
        "{tab} \u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a \\",
        "{lock} \u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}",
        "{shift} \\ \u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e . {shift}",
        ".com @ {space}"
      ],
      shift: [
        '\u0401 ! " \u2116 ; % : ? * ( ) _ + {bksp}',
        "{tab} \u0419 \u0426 \u0423 \u041a \u0415 \u041d \u0413 \u0428 \u0429 \u0417 \u0425 \u042a /",
        "{lock} \u0424 \u042b \u0412 \u0410 \u041f \u0420 \u041e \u041b \u0414 \u0416 \u042d {enter}",
        "{shift} / \u042f \u0427 \u0421 \u041c \u0418 \u0422 \u042c \u0411 \u042e , {shift}",
        ".com @ {space}"
      ]
    };
    this.keyboard = new Keyboard({
      disableButtonHold: true,
      physicalKeyboardHighlight: true,
      physicalKeyboardHighlightPress: true,
      layout: russian,
      buttonTheme: [
        {
          class: 'zone1',
          buttons: '5 6 7 к е н г а п р о м и т ь'
        },
        {
          class: 'zone2',
          buttons: '4 8 у ш в л с б'
        },
        {
          class: 'zone3',
          buttons: '3 9 ц щ ы д ч ю'
        },
        {
          class: 'zone4',
          buttons: '1 2 0 - = й з х ъ ф ж э я .'
        },
        {
          class: 'space',
          buttons: '{space}'
        }
      ]
    });

  }

  changeColor() {
    if (this.exWords[0] == ' ') {
      this.keyboard.removeButtonTheme('{space}', 'nextChar');
    } else {
      this.keyboard.removeButtonTheme(this.exWords[0], 'nextChar');
    }
    this.exWords = this.exWords.substring(1);
    if (this.exWords[0] == ' ') {
      this.keyboard.addButtonTheme('{space}', 'nextChar');
    } else {
      this.keyboard.addButtonTheme(this.exWords[0], 'nextChar');
    }
  }

  speed: string = '0';
  seconds: number = 0;
  minutes: number = 0;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds < 59) {
        this.seconds++;
        this.speed = ((this.symbolCount / (this.minutes * 60 + this.seconds))*60).toFixed(2);
      } else {
        this.minutes++;
        this.seconds = 0;
        this.speed = ((this.symbolCount / (this.minutes * 60 + this.seconds))*60).toFixed(2);
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
      this.symbolCount++;
      if (this.errorCount > this.maxErrors) {
        this.message = "Провал";
        this.complition();
      } else if (this.exWords.length === 0) {
        this.message = "Успех";
        this.complition();
      }
      this.changeColor();
    }, this.timePress * 1000);

  }


  recomendedLvl: number = 1;

  complition() {
    this.pauseTimer();
    this.stopPressTimer();
    this.keyboard.destroy();
    if (this.errorCount < this.maxErrors) {
      this.recomendedLvl = this.allSymbols/ 400 / (this.errorCount + 1) * parseFloat(this.speed)/60;
      if (this.recomendedLvl < 0.197) this.recomendedLvl = 1;
      else if (this.recomendedLvl >= 0.197 && this.recomendedLvl < 0.55) this.recomendedLvl = 2
      else if (this.recomendedLvl < 0.92 && this.recomendedLvl >= 0.55) this.recomendedLvl = 3
      else if (this.recomendedLvl >= 0.92) this.recomendedLvl = 4
    }
    this.httpUserService.changeLevel(this.recomendedLvl);
    this.end = true;
    this.inprogress = false;
  }

  stopPressTimer() {
    clearInterval(this.pressInterval);
  }

  failure = false;
  end = false;
  message = 'Тест пройден';
  onKeyPress = (button: string) => {
    if (button === '{shift}' || button === '{lock}') {
      this.handleShift();
    }
    if (this.exWords.length > 0 && this.exWords[0] != button.replace('{space}', ' ')) {
      this.errorCount++;
    }
    this.changeColor();
    this.symbolCount++;

    if (this.errorCount > this.maxErrors) {
      this.failure = true;
      this.complition();
    } else if (this.exWords.length === 0) {
      this.complition();
    } else {
      this.stopPressTimer();
      this.pressTimer();
    }
    /**
     * If you want to handle the shift and caps lock buttons
     */


  };


  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };


  start() {
    if (!this.inprogress) {
      this.startTimer();
      this.pressTimer();
      this.keyboard.addButtonTheme(this.exWords[0], 'nextChar');
      this.keyboard.setOptions({onKeyPress: button => this.onKeyPress(button)});
      this.inprogress = true;
    }
  }

  inprogress = false;
  hidden = false;
}
