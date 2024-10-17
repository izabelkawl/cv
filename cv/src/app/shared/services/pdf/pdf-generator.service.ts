import { inject, Injectable } from '@angular/core';
import {
  InfoKeys,
  IPersonalInformation,
  SectionTypes,
} from '@app/components/base-layout/base-layout.interface';
import { ISection } from '@app/components/content/section/section.interface';
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
    const { BASIC, WHITE, TEXT_COLOR } = Colors;
    const pdf = new jsPDF();
    const translateService = this.#translateService;
    const { firstName, lastName, position, description } = data.info;
    const colors = {
      white: getDocumentColor(WHITE),
      basic: getDocumentColor(BASIC),
      textColor: getDocumentColor(TEXT_COLOR),
      darkGray: 'darkgray',
    };

    let y = 10;
    let x = 60;
    const contentPosition = { y: 85 };
    const contactPosition = { x, y: 140 };
    const skills = { x, y: 175, width: 65 };
    const section = { x: x + 40, width: 80 };
    const footerPosition = { x: 105, y: 285 };

    const montserratLight: string = 'Montserrat-Light';
    const montserratMedium: string = 'Montserrat-Medium';
    const montserratBold: string = 'Montserrat-Bold';
    const montserratSemiBold: string = 'Montserrat-SemiBold';
    const montserratExtraBold: string = 'Montserrat-ExtraBold';

    [
      montserratLight,
      montserratMedium,
      montserratBold,
      montserratSemiBold,
      montserratExtraBold,
    ].forEach((font: string) => {
      pdf.addFileToVFS(`assets/font/${font}.ttf`, `${font}.ttf`);
      pdf.addFont(`./assets/font/${font}.ttf`, font, 'normal');
    });

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
      pdf.setFont(montserratBold);
      pdf.text(data.info[name], contactPosition.x, contactPosition.y, {
        align: 'center',
      });
      contactPosition.y += 7;
    }

    function createProfileSection(): void {
      pdf.setFontSize(15);
      pdf.setFont(montserratBold);
      y = contentPosition.y;
      pdf.text(getTranslation('PERSONAL_DATA.PROFILE').toUpperCase(), x, y, {
        align: 'center',
      });
      pdf.setFontSize(9);
      pdf.setFont(montserratLight);
      pdf.text(description, x, getY(y - 2), {
        maxWidth: 50,
        align: 'center',
        lineHeightFactor: 1.6,
      });
    }

    function splitTextsOnLength(texts: any, maxLength: number) {
      const result: string[] = [];

      texts.forEach((txt: string) => {
        let text = `\u2022  ${txt}`;
        while (text.length > maxLength) {
          let splitIndex = text.lastIndexOf(' ', maxLength);
          if (splitIndex === -1) splitIndex = maxLength;
          result.push(text.slice(0, splitIndex).trim());
          text = text.slice(splitIndex).trim();
        }
        if (text.length) result.push(text);
      });

      return result;
    }

    function createSkillSection(translate: string, type: SectionTypes): void {
      pdf.setFontSize(12);
      pdf.setFont(montserratBold);
      pdf.setTextColor(colors.textColor);
      pdf.text(getTranslation(translate).toUpperCase(), skills.x, skills.y, {
        align: 'center',
      });
      pdf.setTextColor(colors.textColor);
      skills.y += 10;

      pdf.setFont(montserratLight);
      splitTextsOnLength(data[type][0].description, 48).forEach(
        (title: string) => {
          pdf.setFontSize(9);
          let startX = skills.x - 29;
          const arrayOfNormalAndBoldText = title.split('**');
          arrayOfNormalAndBoldText.map((text, i) => {
            pdf.setFont(montserratBold);
            pdf.setFont(i % 2 ? montserratBold : montserratLight);

            pdf.text(text, startX, skills.y);
            startX = startX + pdf.getStringUnitWidth(text) * 3.2;
          });

          skills.y += 5;
        },
      );
      skills.y += 5;
    }

    function createSection(
      translate: string,
      type: SectionTypes,
      sectionX: number,
      sectionWidth: number,
    ): void {
      pdf.setFontSize(12);
      pdf.setFont(montserratBold);
      pdf.setTextColor(colors.textColor);
      pdf.text(
        getTranslation(translate).toUpperCase(),
        sectionX + 40,
        getY(y - 4),
        { align: 'center', maxWidth: sectionWidth },
      );

      data[type].map((item: ISection) => {
        const { title, subTitle, period, description } = item;

        if (title) {
          pdf.setFont(montserratBold);
          pdf.setFontSize(10);
          pdf.setTextColor(colors.textColor);
          pdf.text(title, sectionX, getY(y + 3));
        }

        pdf.setFontSize(10);
        subTitle && pdf.text(subTitle, sectionX, getY(y - 5));
        period && pdf.text(period, sectionX, getY(y - 5));

        pdf.setTextColor(colors.textColor);
        if (description) {
          pdf.setFontSize(9);
          let descY = getY(y - 5);
          splitTextsOnLength(description, 55).forEach((desc: string) => {
            pdf.setFont(montserratLight);
            let startX = section.x;
            const arrayOfNormalAndBoldText = desc.split('**');
            arrayOfNormalAndBoldText.forEach((text, i) => {
              pdf.setFont(montserratBold);
              pdf.setFont(i % 2 ? montserratBold : montserratLight);

              pdf.text(text, startX, descY);
              startX = startX + pdf.getStringUnitWidth(text) * 3.2;
            });
            descY += 5;
            getY(y - 6);
          });
        }
      });
      getY(y + 5);
    }

    // user-name
    pdf.setTextColor(colors.basic);

    pdf.setFontSize(35);
    pdf.setFont(montserratMedium);
    pdf.text(firstName.toUpperCase(), section.x, 40, {
      lineHeightFactor: 0.8,
    });

    pdf.setFontSize(40);
    pdf.setFont(montserratBold);
    pdf.text(lastName.toUpperCase(), section.x, 55, {
      lineHeightFactor: 0.8,
    });

    pdf.setFont(montserratMedium);
    pdf.setTextColor(colors.textColor);
    pdf.setFontSize(18);
    pdf.text(position, section.x, 63, {
      lineHeightFactor: 0.8,
    });

    // profile
    createProfileSection();
    pdf.setTextColor(colors.basic);
    getInfo('phone');
    pdf.setTextColor(colors.textColor);
    getInfo('email');
    getInfo('github');
    getInfo('linkedIn');
    createSkillSection('SECTIONS.SPECIALIZATION', 'specializations');

    // content
    y = contentPosition.y;
    createSection(
      'SECTIONS.EXPERIENCE',
      'experience',
      section.x,
      section.width,
    );
    createSection('SECTIONS.EDUCATION', 'education', section.x, section.width);

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
