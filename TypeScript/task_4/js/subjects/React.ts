namespace Subjects {
  // Declaration merging: ajout d'un attribut à l'interface Teacher
  export interface Teacher {
    experienceTeachingReact?: number;
  }

  export class React extends Subject {
    getRequirements(): string {
      return "Here is the list of requirements for React";
    }

    getAvailableTeacher(): string {
      if (!this.teacher.experienceTeachingReact || this.teacher.experienceTeachingReact === 0) {
        return "No available teacher";
      }
      return `Available Teacher: ${this.teacher.firstName}`;
    }
  }
}
