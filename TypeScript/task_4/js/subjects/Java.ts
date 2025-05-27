namespace Subjects {
  // Declaration merging: ajout d'un attribut à l'interface Teacher
  export interface Teacher {
    experienceTeachingJava?: number;
  }

  export class Java extends Subject {
    getRequirements(): string {
      return "Here is the list of requirements for Java";
    }

    getAvailableTeacher(): string {
      if (!this.teacher.experienceTeachingJava || this.teacher.experienceTeachingJava === 0) {
        return "No available teacher";
      }
      return `Available Teacher: ${this.teacher.firstName}`;
    }
  }
}
