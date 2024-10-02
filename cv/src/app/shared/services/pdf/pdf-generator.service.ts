import { inject, Injectable } from '@angular/core';
import {
  InfoKeys,
  IPersonalInformation,
  SectionTypes,
} from '@app/base-layout/base-layout.interface';
import { IExperienceEducation } from '@app/components/content/section/section.interface';
import { TranslateService } from '@ngx-translate/core';
import { jsPDF } from 'jspdf';
import { LangType } from '../lang/lang.interface';
import { Colors } from '@app/shared/enums/variables';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  readonly #translateService = inject(TranslateService);

  public generatePdf(data: IPersonalInformation, lang: LangType): void {
    const { BASIC, LILAC, WHITE, ORANGE, BLUE } = Colors;
    const pdf = new jsPDF();
    const translateService = this.#translateService;
    const {
      firstName,
      lastName,
      avatar = '',
      position,
      description,
    } = data.info;
    const colors = {
      white: getDocumentColor(WHITE),
      lilac: getDocumentColor(LILAC),
      basic: getDocumentColor(BASIC),
      blue: getDocumentColor(BLUE),
      orange: getDocumentColor(ORANGE),
      darkGray: 'darkgray',
    };

    let y = 10;
    let x = 50;
    const contentPosition = { y: 80 };
    const contactPosition = { x, y: 140 };
    const skills = { x, y: 175, width: 65 };
    const section = { x: x + 40, width: 80 };
    const footerPosition = { x: 105, y: 285 };

    const userFont: string = 'Caveat-Bold';
    const fontFamily: string = 'Roboto-Regular';
    const fontFamilyBold: string = 'Roboto-Black';

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
      pdf.text(data.info[name], contactPosition.x, contactPosition.y, {
        align: 'center',
      });
      contactPosition.y += 7;
    }

    function createProfileSection(): void {
      pdf.setFontSize(15);
      pdf.setFont(fontFamilyBold);
      y = contentPosition.y;
      pdf.text(getTranslation('personalData.profile').toUpperCase(), x, y, {
        align: 'center',
      });
      pdf.setFontSize(9);
      pdf.setFont(fontFamily);
      pdf.text(description, x, getY(y - 2), {
        maxWidth: 50,
        align: 'center',
        lineHeightFactor: 1.6,
      });
    }

    function createSkillSection(type: 'skills' | 'languages'): void {
      pdf.setFontSize(12);
      pdf.setFont(fontFamilyBold);
      pdf.rect(skills.x - 30, skills.y - 6, skills.width, 9, 'F');

      pdf.setTextColor(colors.orange);
      pdf.text(
        getTranslation(`sections.${type}`).toUpperCase(),
        skills.x,
        skills.y,
        { align: 'center' },
      );
      pdf.setTextColor(colors.blue);
      skills.y += 10;
      data[type].forEach(({ title }) => {
        pdf.setFontSize(10);
        pdf.text(title, skills.x, skills.y, {
          align: 'center',
        });
        skills.y += 7;
      });
      skills.y += 5;
    }

    function createSection(type: SectionTypes): void {
      pdf.setFontSize(12);
      pdf.setFont(fontFamilyBold);
      pdf.rect(section.x, getY(y - 16), section.width, 9, 'F');

      pdf.setTextColor(colors.orange);
      pdf.text(
        getTranslation(`sections.${type}`).toUpperCase(),
        section.x + 40,
        getY(y - 4),
        { align: 'center', maxWidth: section.width },
      );
      data[type].map((item: IExperienceEducation, index: number) => {
        const { title, subTitle, period, description } = item;
        const sectionX = section.x;

        pdf.setFont(fontFamilyBold);
        pdf.setFontSize(10);
        pdf.setTextColor(colors.blue);
        pdf.text(title, sectionX, getY(y + 3));

        pdf.setFontSize(10);
        subTitle && pdf.text(subTitle, sectionX, getY(y - 5));
        period && pdf.text(period, sectionX, getY(y - 5));

        pdf.setTextColor(colors.blue);
        if (description) {
          const dot = '\u2022';
          pdf.setFontSize(9);
          description.forEach((desc: string, i: number) => {
            if (i) {
              const { length } = description[i - 1];
              getY(length < 55 ? y - 5 : y);
            } else {
              getY(y - 2);
            }

            pdf.setFont(fontFamilyBold);
            pdf.text(dot, sectionX, y);

            pdf.setFont(fontFamily);
            pdf.text(desc, sectionX + 3, y, {
              maxWidth: section.width,
              lineHeightFactor: 1.6,
            });
          });
          if (index === data[type].length - 2) {
            getY(y - 5);
          }
        }
      });
      getY(y + 5);
    }

    // avatar
    pdf.addImage(avatar, 'JPEG', 30, getY(y), 50, 50, '', 'FAST');

    pdf.setLineDashPattern([1, 0], 0);
    pdf.setLineWidth(1);
    pdf.setDrawColor(colors.lilac);
    pdf.circle(x +5, getY(y) + 15, 25);

    // user-name
    pdf.setFontSize(40);
    pdf.setFont(userFont);
    pdf.setTextColor(colors.basic);
    pdf.text(firstName, 90, 40);
    pdf.text(lastName, 110, 52);

    pdf.setFont(fontFamilyBold);
    pdf.setTextColor(colors.blue);
    pdf.setFontSize(15);
    pdf.text(position.toUpperCase(), 105, 62, {
      lineHeightFactor: 0.8,
    });

    // profile
    createProfileSection();
    getInfo('phone');
    getInfo('email');
    getInfo('linkedIn');
    createSkillSection('skills');
    createSkillSection('languages');

    // content
    y = contentPosition.y;
    createSection('experience');
    createSection('education');

    // footer
    pdf.setFontSize(6);
    pdf.setTextColor(colors.darkGray);
    pdf.text(data.clause, footerPosition.x, footerPosition.y, {
      maxWidth: 180,
      align: 'center',
      lineHeightFactor: 1.5,
    });

    pdf.save(`${firstName} ${lastName} CV ${lang.toUpperCase()}.pdf`);
  }
}
