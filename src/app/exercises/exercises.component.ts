import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Exercise} from "../models/exercise";
import {Difficulty} from "../models/difficulty";
import {ExerciseService} from "../services/exercise.service";
import {DifficultyService} from "../services/difficulty.service";
import {AuthserviceService} from "../auth/authservice.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  newExercise: Exercise = new Exercise();
  exercises: Exercise[] = [];
  filtered: Exercise[] = [];
  difficulties: Difficulty[] = [];

  constructor(private httpExService: ExerciseService, private httpDifService: DifficultyService, private auth: AuthserviceService, private modalService: NgbModal,
              public router: Router) {
  }

  ngOnInit(): void {
    if (!this.auth.islogin) {
      this.router.navigate(['/login']);
    } else {
      this.httpDifService.getAll().subscribe((data: Difficulty[]) => {
        this.difficulties = data;
        this.httpExService.getAll().subscribe((data: Exercise[]) => {
          this.exercises = data.filter(exercise => exercise.levelId != null);
          this.filtered = this.exercises;
        });
      });
    }
  }

  difficulty(id: number) {
    return this.difficulties.filter(dif => dif.id == id)[0].name;
  }

  closeResult: string;
  exerciseName: string = "";
  currentDiff: string = "";
  newDif: Difficulty = new Difficulty();

  changeDif(id: number) {
    this.currentDiff = this.difficulty(id);
    this.newExercise.levelId = id;
  }

  open(content, id: number, reason: string) {
    if (reason === "change") {
      this.newExercise = JSON.parse(JSON.stringify(this.exercises.filter(ex => ex.id == id)[0]));
      this.exerciseWords = this.newExercise.words;
      this.exerciseName = this.newExercise.name;
      this.currentDiff = this.difficulties.filter(dif => dif.id == this.newExercise.levelId)[0].name;
    } else if (reason === "add") {
      this.exerciseWords = "";
      this.exerciseName = "";
      this.currentDiff = this.difficulties[0].name;
      this.newExercise.levelId = this.difficulties[0].id;
      this.newExercise.id=null;
    }
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: "lg"
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDelete(content, id: number) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == "Delete") {
        this.delete(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }

  file: any;
  exerciseWords: string = "";

  openFile() {
    document.querySelector('input').click();
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    this.uploadDocument();
  }

  uploadDocument() {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      this.exerciseWords = fileReader.result.toString();
    }
    fileReader.readAsText(this.file);
  }

  change() {
    this.newExercise.words = this.exerciseWords;
    this.newExercise.name = this.exerciseName;
    if (this.newExercise.id!=null) {
      this.httpExService.update(this.newExercise).subscribe(() => window.location.reload());
    } else {
      this.httpExService.save(this.newExercise).subscribe(() => window.location.reload());
    }
  }

  delete(id: number) {
    this.httpExService.delete(id).subscribe(() => window.location.reload());
  }

  generate() {
    this.httpExService.getRandomExercise().subscribe((data: Exercise) => {
      this.newExercise.words = data.words;
      this.exerciseWords = this.newExercise.words;
      this.changeDif(data.levelId);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  reloadDif(id: number) {
    this.newDif = JSON.parse(JSON.stringify(this.difficulties.filter(dif => dif.id == id)[0]));
    this.currentDiff = this.newDif.name;
  }

  openLevel(content) {
    this.currentDiff = this.difficulties[0].name;
    this.newDif = JSON.parse(JSON.stringify(this.difficulties[0]));
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateLevel() {
    this.httpDifService.update(this.newDif).subscribe(() => window.location.reload());
  }

  page = 1;
  pageSize = 5;

}
