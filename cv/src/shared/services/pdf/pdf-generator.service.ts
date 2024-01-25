import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { jsPDF } from 'jspdf';
import * as _ from 'lodash';
import { IExperienceEducation } from 'src/app/components/experience-education/experience-education.interface';
import {
  IPersonalInformation,
  ISkill,
  InfoKeys,
  SectionTypes,
} from 'src/app/main/main.interface';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private translateService: TranslateService) {}

  geratePdf(data: IPersonalInformation): void {
    const pdf = new jsPDF();
    const fontFamily: string = 'Ruda-Regular';
    const fontFamilyBold: string = 'Ruda-Bold';

    const translateService = this.translateService;
    const {
      firstName,
      lastName,
      avatar = '',
      position,
      description,
    } = data.info;

    const primaryColor = getComputedStyle(document.body).getPropertyValue(
      '--basic-color',
    );
    const blackColor = '#000';

    pdf.addFileToVFS(`assets/font/${fontFamily}.ttf`, `${fontFamily}.ttf`);
    pdf.addFileToVFS(
      `assets/font/${fontFamilyBold}.ttf`,
      `${fontFamilyBold}.ttf`,
    );
    pdf.addFont(`./assets/font/${fontFamily}.ttf`, fontFamily, 'normal');
    pdf.addFont(
      `./assets/font/${fontFamilyBold}.ttf`,
      fontFamilyBold,
      'normal',
    );
    pdf.setFont(fontFamily);

    let y = 20;

    function getY(i: number, step: number = 10): number {
      y = i + step;
      return y;
    }

    function getTranslation(name: SectionTypes): string {
      return translateService.instant(name as string);
    }

    let infoPosition = { x: 40, y: 160 };

    function getInfo(name: InfoKeys): void {
      pdf.text(data.info[name], infoPosition.x, infoPosition.y, {
        align: 'center',
      });
      infoPosition.y += 10;
    }

    function createAboutMeSection(): void {
      pdf.setFontSize(12);
      pdf.setFont(fontFamilyBold);
      pdf.setTextColor(primaryColor);
      pdf.text(getTranslation('personalData.aboutme'), 40, 80, {
        align: 'center',
      });
      pdf.setFontSize(8);
      const array = description.split(' ');
      const chunk = _.chunk(array, 3);
      let yyy = 90;
      chunk.forEach((cut) => {
        pdf.text(cut.join(' '), 40, yyy, {
          align: 'center',
        });
        yyy += 5;
      });
    }

    function createSkillSection(): void {
      const { skills } = data;
      const skillsPosition = { x: 25, y: 200 };

      pdf.setFontSize(12);
      pdf.setFont(fontFamilyBold);
      pdf.setTextColor(primaryColor);
      pdf.text(
        getTranslation('sections.skills').toUpperCase(),
        skillsPosition.x,
        skillsPosition.y,
      );
      skillsPosition.y += 10;
      pdf.setFont(fontFamilyBold);
      skillsPosition.x += 15;
      skills.forEach(({ name }) => {
        pdf.setFontSize(8);
        pdf.text(name, skillsPosition.x, skillsPosition.y, { align: 'center' });
        skillsPosition.y += 5;
      });
    }

    function createSection(type: SectionTypes): void {
      pdf.setFontSize(12);
      pdf.setFont(fontFamilyBold);
      pdf.setTextColor(primaryColor);
      pdf.text(getTranslation(type).toUpperCase(), 120, getY(y));

      data[type].map((item: IExperienceEducation & ISkill) => {
        const { title, company, description } = item;
        pdf.setFontSize(12);
        pdf.setTextColor(primaryColor);
        pdf.text(title, 65, getY(y));

        pdf.setFontSize(10);
        pdf.text(company, 65, getY(y));

        if (description) {
          const dot = '\u2022';

          pdf.setFont(fontFamily);
          pdf.setTextColor(blackColor);
          pdf.setFontSize(8);
          
          description.forEach((desc: string, i: number) => {
            if (desc.length > 95) {
              const lastSpace = desc.substring(0, 95).lastIndexOf(' ');
              pdf.text(`${dot} ${desc.substring(0, lastSpace)}`+ 
                dot + desc.substring(0, lastSpace),
                70,
                getY(i ? y : y + 2, 5),
              );
              pdf.text(desc.substring(lastSpace, desc.length), 72, getY(y, 5));
            } else {
              pdf.text(`${dot} ${desc}`, 70, getY(i ? y : y + 2, 5));
            }
          });
        }
      });
      y += 5;
    }

    pdf.addImage(avatar, 'JPEG', 40, getY(y) - 5, 40, 40);

    pdf.setTextColor(primaryColor);
    pdf.setFont(fontFamilyBold);

    pdf.setFontSize(40);
    pdf.text(firstName.toUpperCase(), 100, 40);
    pdf.text(lastName.toUpperCase(), 105, 52);

    pdf.setFontSize(10);
    pdf.text(position.toUpperCase(), 125, 57);

    pdf.setFont(fontFamily);
    pdf.setFontSize(10);
    createAboutMeSection();
    getInfo('phone');
    getInfo('email');
    getInfo('linkedIn');
    createSkillSection();

    y += 40;
    createSection('experience');
    createSection('education');

    pdf.save(`${firstName} ${lastName} CV.pdf`);
  }
}
