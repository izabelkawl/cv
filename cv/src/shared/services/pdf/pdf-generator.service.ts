import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { jsPDF } from 'jspdf';
import { IExperienceEducation } from 'src/app/components/experience-education/experience-education.interface';
import {
  IPersonalInformation,
  ISkill,
  InfoKeys,
  SectionTypes,
} from 'src/app/main/main.interface';
import { Colors } from 'src/shared/enums/variables';

const { BASIC, GRAY, WHITE, BLACK, ORANGE, BLUE } = Colors;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private translateService: TranslateService) {}

  geratePdf(data: IPersonalInformation): void {
    const pdf = new jsPDF();
    const translateService = this.translateService;
    const {
      firstName,
      lastName,
      avatar = '',
      position,
      description,
    } = data.info;
    const colors = {
      black: getDocumentColor(BLACK),
      white: getDocumentColor(WHITE),
      gray: getDocumentColor(GRAY),
      basic: getDocumentColor(BASIC),
      blue: getDocumentColor(BLUE),
      orange: getDocumentColor(ORANGE),
    };

    const userFont: string = 'Caveat-Bold';
    const fontFamily: string = 'Roboto-Light';
    const fontFamilyBold: string = 'Roboto-Bold';

    pdf.addFileToVFS(`assets/font/${userFont}.ttf`, `${userFont}.ttf`);
    pdf.addFont(`./assets/font/${userFont}.ttf`, userFont, 'normal');

    pdf.addFileToVFS(`assets/font/${fontFamily}.ttf`, `${fontFamily}.ttf`);
    pdf.addFont(`./assets/font/${fontFamily}.ttf`, fontFamily, 'normal');

    pdf.addFileToVFS(
      `assets/font/${fontFamilyBold}.ttf`,
      `${fontFamilyBold}.ttf`,
    );
    pdf.addFont(
      `./assets/font/${fontFamilyBold}.ttf`,
      fontFamilyBold,
      'normal',
    );

    pdf.setFont(fontFamily);

    let y = 20;
    let x = 50;
    const contentPosition = { y: 82 };
    const infoPosition = { x, y: 150 };
    const section = { x: x + 35, width: 100 };

    function getDocumentColor(color: string): string {
      return getComputedStyle(document.body).getPropertyValue(color);
    }

    function getY(value: number): number {
      y = value + 10;
      return y;
    }

    function getTranslation(name: SectionTypes): string {
      return translateService.instant(name as string);
    }

    function getInfo(name: InfoKeys): void {
      pdf.setTextColor(colors.blue);
      pdf.setFont(fontFamilyBold);
      pdf.text(data.info[name], infoPosition.x, infoPosition.y, {
        align: 'center',
      });
      infoPosition.y += 7;
    }

    function createAboutMeSection(): void {
      pdf.setFontSize(12);
      pdf.setFont(fontFamilyBold);
      pdf.setTextColor(colors.blue);
      y = contentPosition.y;
      pdf.text(getTranslation('personalData.aboutMe'), x, y, {
        align: 'center',
      });
      pdf.setFontSize(8);
      pdf.setFont(fontFamily);
      pdf.setTextColor(colors.black);
      pdf.text(description, x, getY(y), {
        maxWidth: 50,
        align: 'center',
        lineHeightFactor: 2,
      });
    }

    function createSkillSection(): void {
      const { skills } = data;
      const skillsPosition = { x, y: 190 };

      pdf.setFontSize(10);
      pdf.setFont(fontFamilyBold);
      pdf.setFillColor(colors.basic);
      pdf.rect(skillsPosition.x - 25, skillsPosition.y - 6, 50, 9, 'F');

      pdf.setTextColor(colors.orange);
      pdf.text(
        getTranslation('sections.skills').toUpperCase(),
        skillsPosition.x,
        skillsPosition.y,
        { align: 'center' },
      );
      pdf.setTextColor(colors.blue);
      skillsPosition.y += 10;
      skills.forEach(({ name }) => {
        pdf.setFontSize(8);
        pdf.text(name, skillsPosition.x, skillsPosition.y, { align: 'center' });
        skillsPosition.y += 7;
      });
    }

    function createSection(type: SectionTypes): void {
      pdf.setFillColor(colors.basic);
      pdf.rect(section.x, getY(y - 16), section.width, 9, 'F');

      pdf.setFontSize(10);
      pdf.setFont(fontFamilyBold);
      pdf.setTextColor(colors.orange);
      pdf.text(
        getTranslation(`sections.${type}`).toUpperCase(),
        section.x + 50,
        getY(y - 4),
        { align: 'center', maxWidth: section.width },
      );

      data[type].map((item: IExperienceEducation & ISkill) => {
        const { title, company, description } = item;
        const sectionX = section.x + 5;

        pdf.setFont(fontFamilyBold);
        pdf.setFontSize(10);
        pdf.setTextColor(colors.blue);
        pdf.text(title, sectionX, getY(y + 2));

        pdf.setFontSize(10);
        pdf.text(company, sectionX, getY(y - 3));

        pdf.setTextColor(colors.black);
        if (description) {
          const dot = '\u2022';

          pdf.setFontSize(9);

          description.forEach((desc: string, i: number) => {
            if (i) {
              const { length } = description[i - 1];
              getY(length < 60 ? y - 5 : length > 100 ? y + 3 : y);
            } else {
              getY(y);
            }

            pdf.setFont(fontFamilyBold);
            pdf.text(dot, sectionX, y);

            pdf.setFont(fontFamily);
            pdf.text(desc, sectionX + 3, y, {
              maxWidth: section.width - 10,
              lineHeightFactor: 1.2,
            });
          });
        }
      });
      y += 10;
    }

    pdf.addImage(avatar, 'JPEG', 50, getY(y) - 5, 40, 40);

    pdf.setLineDashPattern([2, 1], 0);
    pdf.setLineWidth(1.5);
    pdf.setDrawColor(colors.gray);
    pdf.circle(70, getY(y) + 5, 23);

    pdf.setFontSize(45);
    pdf.setFont(userFont);
    pdf.setTextColor(colors.basic);
    pdf.text(firstName, 100, 40);
    pdf.text(lastName, 110, 55);

    pdf.setFont(fontFamilyBold);
    pdf.setTextColor(colors.blue);
    pdf.setFontSize(12);
    pdf.text(position, 120, 60);

    pdf.setFontSize(10);

    createAboutMeSection();
    getInfo('phone');
    getInfo('email');
    getInfo('linkedIn');
    createSkillSection();

    y = contentPosition.y;
    createSection('experience');
    createSection('education');

    pdf.save(`${firstName} ${lastName} CV.pdf`);
  }
}
