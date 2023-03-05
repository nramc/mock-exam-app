import {Injectable} from '@angular/core';
import allLearningPaths from '../../assets/data/all-learning-paths.json';
import {LearningPath} from "../domain/learning-path.model";

@Injectable({
  providedIn: 'root'
})
export class LearningPathDataService {
  allLearningPaths: LearningPath[] = [];

  constructor() {
    this.allLearningPaths = allLearningPaths;
  }

  getAllLearningPaths(): LearningPath[] {
    return [...this.allLearningPaths];
  }
}
