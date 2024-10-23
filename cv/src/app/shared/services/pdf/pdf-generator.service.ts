import { inject, Injectable } from '@angular/core';
import {
  IPersonalInformation,
  SectionTypes,
} from '@app/components/base-layout/base-layout.interface';
import { ISection } from '@app/components/content/section/section.interface';
import { TranslateService } from '@ngx-translate/core';
import { jsPDF } from 'jspdf';
import { LangType } from '../lang/lang.interface';
import { Colors } from '@app/shared/enums/variables';
import { LinkPipe } from './../../pipes/link.pipe';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  readonly #translateService = inject(TranslateService);

  public generatePdf(data: IPersonalInformation, lang: LangType): void {
    const pdf = new jsPDF();
    const translateService = this.#translateService;
    const montserratLight: string = 'Montserrat-Light';
    const montserratMedium: string = 'Montserrat-Medium';
    const montserratBold: string = 'Montserrat-Bold';
    const montserratLightItalic: string = 'Montserrat-LightItalic';
    const montserratSemiBold: string = 'Montserrat-SemiBold';
    const montserratExtraBold: string = 'Montserrat-ExtraBold';

    [
      montserratLight,
      montserratMedium,
      montserratBold,
      montserratLightItalic,
      montserratSemiBold,
      montserratExtraBold,
    ].forEach((font: string) => {
      pdf.addFileToVFS(`assets/font/${font}.ttf`, `${font}.ttf`);
      pdf.addFont(`./assets/font/${font}.ttf`, font, 'normal');
    });

    const colors = {
      white: getDocumentColor(Colors.WHITE),
      basic: getDocumentColor(Colors.BASIC),
      textColor: getDocumentColor(Colors.TEXT_COLOR),
      lightBeigeColor: getDocumentColor(Colors.LIGHT_BEIGE),
      lightGray: getDocumentColor(Colors.LIGHT_GRAY),
      darkGray: getDocumentColor(Colors.DARK_GRAY),
      black: getDocumentColor(Colors.BLACK),
    };

    let y = 0;

    const profilePosition = { x: 20, y: 60, width: 60 };
    const contactPosition = { x: 20, y: 115, width: 60 };
    const skillsPosition = { x: 20, y: 140, width: 60 };
    const sectionPosition = { x: 90, y: 80, width: 110 };
    const footerPosition = { x: 15, y: 285, width: 180 };

    function getDocumentColor(color: string): string {
      return getComputedStyle(document.body).getPropertyValue(color);
    }

    function addNewPage(): void {
      pdf.addPage();
      y = 10;
      pdf.setFillColor(colors.basic);
      pdf.rect(14, 10, 70, 267, 'F');
    }

    function setY(value: number): number {
      y = value + 10;
      return y;
    }

    function getTranslation(name: SectionTypes): string {
      return translateService.instant(name as string);
    }

    function getInfo(name: string, link: string): void {
      pdf.setFont(montserratLightItalic);
      pdf.text(name, contactPosition.x, contactPosition.y);
      pdf.setFont(montserratBold);
      pdf.text(
        new LinkPipe().transform(link),
        contactPosition.x + name.length * 2.1,
        contactPosition.y,
      );
      contactPosition.y += 5;
    }

    function createProfileSection(): void {
      pdf.setFontSize(15);
      pdf.setFont(montserratBold);
      pdf.text(
        getTranslation('PERSONAL_DATA.PROFILE'),
        profilePosition.x,
        profilePosition.y,
      );
      pdf.setLineWidth(0.4);
      pdf.line(
        profilePosition.x,
        setY(y - 5),
        profilePosition.x + profilePosition.width,
        y,
      );
      pdf.setFontSize(9);
      pdf.setFont(montserratMedium);
      pdf.text(data.info.description, profilePosition.x, setY(y - 2), {
        maxWidth: profilePosition.width,
        lineHeightFactor: 1.3,
      });
    }

    function splitTextsOnLength(
      texts: string[],
      maxLength: number,
      xPosition: number,
      descriptionY: number,
    ): string[] {
      const result: string[] = [];

      texts.forEach((text: string) => {
        pdf.setFont('Symbol');
        pdf.setFontSize(9);
        pdf.text('·', xPosition + 1, descriptionY);
        descriptionY = descriptionY + (text.length > maxLength ? 10 : 5);

        if (text.length > maxLength)
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

    function createSection(
      translate: string,
      dataType: ISection[],
      section: { x: number; y?: number; width: number },
    ): void {
      const { x, width: sectionWidth } = section;

      pdf.setFontSize(15);
      pdf.setFont(montserratSemiBold);
      pdf.text(getTranslation(translate), x, setY(y), {
        maxWidth: sectionWidth,
      });
      pdf.setLineWidth(0.2);
      pdf.line(x, setY(y - 5), x + sectionWidth, y);

      dataType.map((item: ISection) => {
        const { title, subTitle, period, description } = item;
        pdf.setFontSize(10);

        if (y >= 280) {
          addNewPage();
        }
        if (title) {
          pdf.setFont(montserratBold);
          pdf.text(title, x, setY(y - 3));
        }
        if (period) {
          pdf.setFont(montserratLightItalic);
          pdf.text(period, 200, y, {
            align: 'right',
          });
        }
        if (subTitle) {
          pdf.setFont(montserratSemiBold);
          pdf.text(subTitle, x, setY(y - 3));
        } else {
          setY(y - 10);
        }
        if (description) {
          pdf.setFontSize(9);
          let descY = setY(y - 3);
          splitTextsOnLength(
            description,
            sectionWidth / 2 + 7,
            x,
            descY,
          ).forEach((desc: string) => {
            if (descY >= 280) {
              addNewPage();
              descY = 10;
            }

            pdf.setFont(montserratLight);
            let startX = x + 5;
            desc.split('**').forEach((text, i) => {
              pdf.setFont(montserratBold);
              pdf.setFont(i % 2 ? montserratBold : montserratLight);
              pdf.text(text, startX, descY);
              startX = startX + pdf.getStringUnitWidth(text) * 3.2;
            });
            descY += 5;
            setY(y - 5);
          });
        }
      });
    }
    // background
    pdf.setFillColor(colors.lightBeigeColor);
    pdf.rect(7, 0, 196, 80, 'F');
    pdf.setFillColor(colors.basic);
    pdf.rect(14, 10, 70, 267, 'F');

    // user-name
    pdf.setTextColor(colors.textColor);
    pdf.setFontSize(28);
    pdf.setFont(montserratMedium);
    pdf.text(data.info.firstName.toUpperCase(), sectionPosition.x, 40, {
      lineHeightFactor: 0.8,
    });

    pdf.setTextColor(colors.basic);
    pdf.setFontSize(32);
    pdf.setFont(montserratExtraBold);
    pdf.text(data.info.lastName.toUpperCase(), sectionPosition.x, 52, {
      lineHeightFactor: 0.8,
    });

    pdf.setFont(montserratMedium);
    pdf.setTextColor(colors.textColor);
    pdf.setFontSize(16);
    pdf.text(data.info.position, sectionPosition.x, 59, {
      lineHeightFactor: 0.8,
    });

    // profile
    y = profilePosition.y;
    pdf.setDrawColor(colors.lightBeigeColor);
    pdf.setTextColor(colors.white);
    createProfileSection();
    getInfo('tel.', data.info.phone);
    getInfo('email:', data.info.email);
    getInfo('github:', data.info.github);
    getInfo('linkedIn:', data.info.linkedIn);
    y = skillsPosition.y;
    createSection(
      'SECTIONS.SPECIALIZATION',
      data.specializations,
      skillsPosition,
    );

    // content
    pdf.setDrawColor(colors.textColor);
    pdf.setTextColor(colors.textColor);
    y = sectionPosition.y;
    createSection('SECTIONS.EXPERIENCE', data.experience, sectionPosition);
    createSection('SECTIONS.EDUCATION', data.education, sectionPosition);

    // footer
    pdf.setFontSize(6);
    pdf.setTextColor(colors.textColor);
    pdf.text(data.clause, footerPosition.x, footerPosition.y, {
      maxWidth: footerPosition.width,
      align: 'justify',
      lineHeightFactor: 1.5,
    });

    pdf.save(
      `${data.info.firstName} ${
        data.info.lastName
      } CV ${lang.toUpperCase()}.pdf`,
    );
  }
}
