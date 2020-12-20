import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import Keyboard from 'simple-keyboard';
import Layout from 'simple-keyboard-layouts/build/layouts/russian';
import {AuthserviceService} from '../auth/authservice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Exercise} from '../models/exercise';
import {ExerciseService} from '../services/exercise.service';
import {DifficultyService} from '../services/difficulty.service';
import {Difficulty} from '../models/difficulty';
import {Statistic} from "../models/statistic";
import {StatisticService} from "../services/statistic.service";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss', '../../../node_modules/simple-keyboard/build/css/index.css']
})
export class TrainComponent implements OnInit {
  value = '';
  keyboard: Keyboard;
  errorCount: number = 0;
  maxErrors: number;
  exWords: string;
  symbolCount: number = 0;
  allSymbols: number;
  id: number;
  timePress: number;
  statistics: Statistic[] = [];
  newStat: Statistic = new Statistic();

  OK() {
    this.router.navigate(['/list']);
  }

  ngOnInit() {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.httpExService.getID(this.id).subscribe((data: Exercise) => {
        this.exWords = data.words;
        this.allSymbols = this.exWords.length;
        this.httpDiffService.getID(data.levelId).subscribe((data: Difficulty) => {
          this.maxErrors = data.maxErrors;
          this.timePress = data.timePress;
        });
      });
      this.httpStatService.getAll().subscribe((data: Statistic[]) => this.statistics = data);
    }
  }

  constructor(private auth: AuthserviceService, private httpDiffService: DifficultyService,
              private activateRoute: ActivatedRoute, private httpExService: ExerciseService, private httpStatService: StatisticService,
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
          buttons: '1 2 0 - = й з х ъ ф ж э я /'
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
      this.symbolCount++;
      if (this.errorCount > this.maxErrors) {
        this.message = "Провал";
        this.complition();
        //send stat
      } else if (this.exWords.length === 0) {
        this.message = "Успех";
        this.complition();
        //send stat
      }
      this.changeColor();
    }, this.timePress * 1000);

  }

  filtered: Statistic[];

  complition() {
    this.pauseTimer();
    this.stopPressTimer();
    this.keyboard.destroy();

    this.filtered = this.statistics.filter(statistic => statistic.userId === parseInt(localStorage.getItem('userId')) && statistic.exerciseId === this.id);

    if (this.filtered[0] === undefined) {
      this.newStat.userId = parseInt(localStorage.getItem('userId'));
      this.newStat.exerciseId = this.id;
      this.newStat.avgSpeed = parseInt(this.speed);
      this.newStat.dateExecution = new Date();
      this.newStat.errors = this.errorCount;
      this.newStat.maxSpeed = parseInt(this.speed);
      this.newStat.numberOfExecutions = 1;
      if (this.failure)
        this.newStat.numberOfFailures = 1;
      else this.newStat.numberOfFailures = 0;
      this.httpStatService.update(this.newStat).subscribe();
    }
    this.end = true;
    this.inprogress = false;
  }

  stopPressTimer() {
    clearInterval(this.pressInterval);
  }

  failure = false;
  end = false;
  message = '';
  onKeyPress = (button: string) => {
    if (this.exWords.length > 0 && this.exWords[0] != button.replace('{space}', ' ')) {
      this.errorCount++;
    }
    this.changeColor();
    this.symbolCount++;

    if (this.errorCount > this.maxErrors) {
      this.message = "Провал";
      this.failure = true;
      this.complition();
      //send stat
    } else if (this.exWords.length === 0) {
      this.message = "Успех";
      this.complition();
      //send stat
    } else {
      this.stopPressTimer();
      this.pressTimer();
    }
    /**
     * If you want to handle the shift and caps lock buttons
     */
    //  if (button === '{shift}' || button === '{lock}') {
    //   this.handleShift();
    // }

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
