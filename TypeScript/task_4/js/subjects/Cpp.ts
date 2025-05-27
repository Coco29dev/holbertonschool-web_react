namespace Subjects {
  // Declaration merging: ajout d'un attribut à l'interface Teacher
  export interface Teacher {
    experienceTeachingC?: number;
  }

  export class Cpp extends Subject {
    getRequirements(): string {
      return "Here is the list of requirements for Cpp";
    }

    getAvailableTeacher(): string {
      if (!this.teacher.experienceTeachingC || this.teacher.experienceTeachingC === 0) {
        return "No available teacher";
      }
      return `Available Teacher: ${this.teacher.firstName}`;
    }
  }
}
