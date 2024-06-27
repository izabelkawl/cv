import { NgModule } from "@angular/core";
import { ExperienceEducationModule } from "./experience-education/experience-education.module";
import { PersonalDataModule } from "./personal-data/personal-data.module";
import { SkillsModule } from "./skills/skills.module";
import { UserModule } from "./user/user.module";

@NgModule({
  imports: [UserModule, PersonalDataModule, SkillsModule, ExperienceEducationModule],
  exports: [UserModule, PersonalDataModule, SkillsModule, ExperienceEducationModule],
})
export class ComponentsModule {}