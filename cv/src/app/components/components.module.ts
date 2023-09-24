import { NgModule } from "@angular/core";
import { PersonalInfoModule } from "./personal-info/personal-info.module";
import { SkillsModule } from "./skills/skills.module";
import { ExperienceEducationModule } from "./experience-education/experience-education.module";

@NgModule({
  imports: [PersonalInfoModule, SkillsModule, ExperienceEducationModule],
  exports: [PersonalInfoModule, SkillsModule, ExperienceEducationModule],
})
export class ComponentsModule {}