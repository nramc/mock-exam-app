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

  getLearningPathsByKeyword(keyword: string): LearningPath[] {
    return [...this.allLearningPaths.filter(l => l.title.toLowerCase().search(keyword.toLowerCase()) != -1)];
  }

}
