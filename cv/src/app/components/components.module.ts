import { NgModule } from "@angular/core";
import { UserInfoModule } from "./user-info/user-info.module";
import { SkillsModule } from "./skills/skills.module";
import { ExperienceEducationModule } from "./experience-education/experience-education.module";

@NgModule({
  imports: [UserInfoModule, SkillsModule, ExperienceEducationModule],
  exports: [UserInfoModule, SkillsModule, ExperienceEducationModule],
})
export class ComponentsModule {}